import {Request, Response} from 'express';
import {EHttpResponseStatus} from '../../../Core/Enum/httpEnum';
import {
    EAuthorizationControllerFailureMessages,
    EAuthorizationControllerSuccessMessages,
} from '../enum/authorization.enum';
import {logger} from '../../../services/logger';
import {appConfig} from '../../../config/appConfig';
import UserSchema from '../../../schemas/User';
import type {IUser} from '../../../models/User';
import {IEmailResultsHandlers, sendEmail} from '../../../services/mailer';
import {ROUTE} from '../../../const/routeConst';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import RefreshTokenSchema from '../../../schemas/RefreshToken';
import User from '../../../schemas/User';

const NAMESPACE = 'AuthorizationController';

class AuthorizationController {
    /** Метод отправляет письмо подтверждения регистрации по токену. */
    private verifyByEmail = (user: IUser, {onSuccess, onError, onFinished}: IEmailResultsHandlers = {}) => {
        const verifyToken = jwt.sign(
            {
                type: appConfig.authOptions.tokens.verify.type,
                userId: user._id,
            },
            appConfig.authOptions.jwtSecret,
            {expiresIn: appConfig.authOptions.tokens.verify.expiresIn}
        );

        const url = `${ROUTE.API.AUTHORIZATION.VERIFY.FULL_PATH}/${verifyToken}`;

        sendEmail(
            {
                to: user.email,
                subject: 'Account Verification Token',
                text: `Hello,\n\nPlease verify your account by clicking the link:\n${url}`,
            },
            {
                onSuccess,
                onError,
                onFinished,
            }
        );
    };

    /** Метод создаёт access token. */
    private generateAccessToken = (userId) => {
        const payload = {
            userId,
            type: appConfig.authOptions.tokens.access.type,
        };
        const options = {
            expiresIn: appConfig.authOptions.tokens.access.expiresIn,
        };
        return jwt.sign(payload, appConfig.authOptions.jwtSecret, options);
    };

    /** Метод создаёт refresh token. */
    private generateRefreshToken = () => {
        const payload = {
            id: `${Math.random()}`,
            type: appConfig.authOptions.tokens.refresh.type,
        };
        const options = {
            expiresIn: appConfig.authOptions.tokens.refresh.expiresIn,
        };
        return {
            id: payload.id,
            token: jwt.sign(payload, appConfig.authOptions.jwtSecret, options),
        };
    };

    /** Метод заменяет refresh token для пользователя. */
    private replaceDbRefreshToken = (token, userId) =>
        RefreshTokenSchema.findOneAndRemove({userId}).then(() => {
            logger.info(NAMESPACE, 'Refresh token removed from DB');
            return RefreshTokenSchema.create({token, userId});
        });

    /** Метод создает пару токенов для пользователя. */
    private issueTokenPair = async (userId: string) => {
        const accessToken = this.generateAccessToken(userId);
        const refreshToken = this.generateRefreshToken();

        return this.replaceDbRefreshToken(refreshToken.id, userId).then(() => {
            logger.info(NAMESPACE, 'New tokens for user: ', {
                accessToken,
                refreshToken: refreshToken,
            });

            return {
                accessToken,
                refreshToken: refreshToken.token,
            };
        });
    };

    check = async (req: Request, res: Response) => {
        try {
            const jwtToken = req.cookies.jwt;

            if (!jwtToken)
                throw {
                    status: EHttpResponseStatus.UNAUTHORIZED,
                    message: EAuthorizationControllerFailureMessages.USER_IS_UNAUTHORIZED,
                };

            logger.info(NAMESPACE, 'cookie', jwtToken);

            const jwtData = jwt.verify(jwtToken, appConfig.authOptions.jwtSecret);

            if (typeof jwtData !== 'object' || !jwtData?.userId)
                throw {
                    status: EHttpResponseStatus.INTERNAL_SERVER_ERROR,
                    message: EAuthorizationControllerFailureMessages.INVALID_TOKEN,
                };

            const user = await UserSchema.findById(jwtData.userId);
            if (!user) {
                throw {
                    status: EHttpResponseStatus.BAD_REQUEST,
                    message: EAuthorizationControllerFailureMessages.INVALID_TOKEN,
                };
            }

            if (!user.isVerified) {
                throw {
                    status: EHttpResponseStatus.BAD_REQUEST,
                    message: EAuthorizationControllerFailureMessages.USER_IS_NOT_VERIFIED,
                };
            }

            return res.status(EHttpResponseStatus.OK).json(user);
        } catch (error) {
            return res.status(error.status || EHttpResponseStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || EAuthorizationControllerFailureMessages.INTERNAL_SERVER_ERROR,
            });
        }
    };

    /** Метод обработки запроса регистрации. */
    register = async (req: Request, res: Response) => {
        logger.info(NAMESPACE, 'Register', req.body);

        try {
            const {username, email, password} = req.body;

            const user: IUser = await UserSchema.findOne({
                $or: [{username: {$regex: username, $options: 'i'}}, {email: {$regex: email, $options: 'i'}}],
            });

            if (user) {
                return res.status(EHttpResponseStatus.BAD_REQUEST).json({
                    message: EAuthorizationControllerFailureMessages.USER_ALREADY_EXISTS,
                });
            }

            const newUser = await new UserSchema({
                username,
                email: email.toLowerCase(),
                password: bcrypt.hashSync(req.body.password, 10),
            }).save();

            try {
                this.verifyByEmail(newUser, {
                    onSuccess: () =>
                        res.status(EHttpResponseStatus.CREATED).json({
                            success: true,
                            message: EAuthorizationControllerSuccessMessages.USER_CREATED,
                            data: {
                                username: newUser.username,
                                email: newUser.email,
                            },
                        }),
                    onError: () => {
                        res.status(EHttpResponseStatus.INTERNAL_SERVER_ERROR).json({
                            message: EAuthorizationControllerFailureMessages.EMAIL_DIDNT_SENT,
                        });
                    },
                });
            } catch (e) {
                return res.status(EHttpResponseStatus.INTERNAL_SERVER_ERROR).json({
                    message: EAuthorizationControllerFailureMessages.EMAIL_DIDNT_SENT,
                });
            }
        } catch (error) {
            logger.error(NAMESPACE, error.message, error);

            return res.status(EHttpResponseStatus.INTERNAL_SERVER_ERROR).json({
                message: EAuthorizationControllerFailureMessages.INTERNAL_SERVER_ERROR,
            });
        }
    };

    /**
     * Метод обработки запроса верификации.
     */
    verify = async (req: Request, res: Response) => {
        try {
            logger.info(NAMESPACE, 'Verify', {
                params: req.params,
            });

            let payload;
            try {
                payload = jwt.verify(req.params.token, appConfig.authOptions.jwtSecret);

                if (payload.type !== appConfig.authOptions.tokens.verify.type) {
                    return res.status(EHttpResponseStatus.BAD_REQUEST).json({
                        message: EAuthorizationControllerFailureMessages.INVALID_TOKEN,
                    });
                }
            } catch (e) {
                if (e instanceof jwt.TokenExpiredError || e instanceof jwt.JsonWebTokenError) {
                    return res.status(EHttpResponseStatus.BAD_REQUEST).json({
                        message: EAuthorizationControllerFailureMessages.INVALID_TOKEN,
                    });
                }
            }

            const user: IUser = await UserSchema.findById(payload.userId);

            if (!user) {
                return res.status(EHttpResponseStatus.BAD_REQUEST).json({
                    message: EAuthorizationControllerFailureMessages.INVALID_TOKEN,
                });
            }

            if (user.isVerified) {
                return res.status(EHttpResponseStatus.BAD_REQUEST).json({
                    message: EAuthorizationControllerFailureMessages.USER_ALREADY_VERIFIED,
                });
            }

            await User.updateOne({_id: user._id}, {$set: {isVerified: true}}).exec();

            return res.status(EHttpResponseStatus.OK).json({
                message: EAuthorizationControllerSuccessMessages.USER_VERIFIED,
            });
        } catch (error) {
            return res.status(EHttpResponseStatus.INTERNAL_SERVER_ERROR).json({
                message: EAuthorizationControllerFailureMessages.INTERNAL_SERVER_ERROR,
            });
        }
    };

    /** Метод обработки запроса аутентификации. */
    login = async (req: Request, res: Response) => {
        logger.info(NAMESPACE, 'Login', req.body);

        try {
            const user = await UserSchema.findOne({
                $or: [
                    {username: {$regex: req.body.login, $options: 'i'}},
                    {email: {$regex: req.body.login, $options: 'i'}},
                ],
            });

            if (!user || bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(EHttpResponseStatus.FORBIDDEN).json({
                    success: false,
                    message: EAuthorizationControllerFailureMessages.INVALID_CREDENTIALS,
                });
            }

            if (!user.isVerified) {
                return res.status(EHttpResponseStatus.BAD_REQUEST).json({
                    success: false,
                    message: EAuthorizationControllerFailureMessages.USER_IS_NOT_VERIFIED,
                });
            }

            const {accessToken, refreshToken} = await this.issueTokenPair(user._id);

            res.cookie('Authorization', accessToken);
            res.cookie('RefreshToken', refreshToken);

            return res.status(EHttpResponseStatus.OK).json({
                username: user.username,
                email: user.email,
                accessToken,
                refreshToken,
            });
        } catch (error) {
            logger.error(NAMESPACE, error.message, error);

            return res.status(EHttpResponseStatus.INTERNAL_SERVER_ERROR).json({
                message: EAuthorizationControllerFailureMessages.INTERNAL_SERVER_ERROR,
            });
        }
    };

    refresh = async (req: Request, res: Response) => {
        try {
            const {Authorization, RefreshToken} = req.cookies;

            logger.info(NAMESPACE, 'Refresh', {
                accessToken: Authorization,
                refreshToken: RefreshToken,
            });

            let payload;
            try {
                payload = jwt.verify(RefreshToken, appConfig.authOptions.jwtSecret);

                if (payload.type !== appConfig.authOptions.tokens.refresh.type) {
                    logger.info(NAMESPACE, 'Refresh', 'Invalid token type');

                    return res.status(EHttpResponseStatus.BAD_REQUEST).json({
                        message: EAuthorizationControllerFailureMessages.INVALID_TOKEN,
                    });
                }
            } catch (e) {
                if (e instanceof jwt.TokenExpiredError || e instanceof jwt.JsonWebTokenError) {
                    logger.info(NAMESPACE, 'Refresh', 'Expired token');

                    return res.status(EHttpResponseStatus.BAD_REQUEST).json({
                        message: EAuthorizationControllerFailureMessages.INVALID_TOKEN,
                    });
                }
            }

            const token = await RefreshTokenSchema.findOne({token: payload.id}).exec();

            if (token === null) {
                logger.info(NAMESPACE, 'Refresh', 'Token not found');

                return res.status(EHttpResponseStatus.BAD_REQUEST).json({
                    message: EAuthorizationControllerFailureMessages.INVALID_TOKEN,
                });
            }

            const {accessToken, refreshToken: newRefreshToken} = await this.issueTokenPair(token.userId);

            res.cookie('Authorization', accessToken);
            res.cookie('RefreshToken', newRefreshToken);

            return res.status(EHttpResponseStatus.OK).json({});
        } catch (error) {
            logger.error(NAMESPACE, error.message, error);

            return res.status(EHttpResponseStatus.INTERNAL_SERVER_ERROR).json({
                message: EAuthorizationControllerFailureMessages.INTERNAL_SERVER_ERROR,
            });
        }
    };

    logout = async (req: Request, res: Response) => {
        logger.info(NAMESPACE, 'Logout');

        const jwtToken = req.cookies.jwt;

        if (!jwtToken)
            throw {
                status: EHttpResponseStatus.UNAUTHORIZED,
                message: EAuthorizationControllerFailureMessages.USER_IS_UNAUTHORIZED,
            };

        logger.info(NAMESPACE, 'cookie', jwtToken);

        const jwtData = jwt.verify(jwtToken, appConfig.authOptions.jwtSecret);

        if (typeof jwtData !== 'object' || !jwtData?.userId)
            throw {
                status: EHttpResponseStatus.INTERNAL_SERVER_ERROR,
                message: EAuthorizationControllerFailureMessages.INVALID_TOKEN,
            };

        const user = await UserSchema.findById(jwtData.userId);
        if (!user) {
            throw {
                status: EHttpResponseStatus.BAD_REQUEST,
                message: EAuthorizationControllerFailureMessages.INVALID_TOKEN,
            };
        }

        if (!user.isVerified) {
            throw {
                status: EHttpResponseStatus.BAD_REQUEST,
                message: EAuthorizationControllerFailureMessages.USER_IS_NOT_VERIFIED,
            };
        }

        // TODO Удалить токен из базы
        await RefreshTokenSchema.findOne({
            userId: user._id,
        }).remove();

        return res.status(EHttpResponseStatus.OK).json({
            success: true,
            message: EAuthorizationControllerSuccessMessages.SUCCESSFUL_LOGOUT,
        });
    };
}

export const authorizationController = new AuthorizationController();
