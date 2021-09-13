import {
    EAuthorizationControllerFailureMessages,
} from "../enum/authorization.enum";
import {AuthorizationError} from "../exceptions";
import bcrypt from 'bcrypt';
import {sendEmail} from "services/mailer";
import jwt from "jsonwebtoken";
import {config} from "config/app.config";
import {ROUTE} from "core/const/routeConst";
import {logger} from "services/logger";
import type {
    IGenerateRefreshTokenResponse,
    IIssueTokenPairResponse,
    ILoginServiceResponse
} from "../types/authorization.types";
import type {ITokenSchema} from "../types/schema.types";
import { EHttpResponseStatus } from "common/enum";
import TokenSchema from "../schemas/Token";
import type {IUser} from "common/types/user.types";
import UserSchema from "common/schemas/user.schema";
import TokenService from './token.service';

const NAMESPACE = 'USER_SERVICE';

class UserService {
    /** Метод отправляет письмо подтверждения регистрации по токену. */
    private verifyByEmail = async (user: IUser) => {
        try {
            const activateToken = jwt.sign(
                {
                    type: config.authOptions.tokens.activate.type,
                    userId: user._id,
                },
                config.authOptions.jwtSecret,
                {expiresIn: config.authOptions.tokens.activate.expiresIn}
            );

            const url = `${config.server.url}${ROUTE.API.AUTHORIZATION.ACTIVATE.FULL_PATH}?token=${activateToken}`;

            sendEmail(
                {
                    to: user.email,
                    subject: 'Account verification token',
                    html: `
                    <div>
                        <h3>Hello. Please, verify your account!</h3>
                        <a href="${url}">Click here</a>
                    </div>
                `,
                }
            );
        } catch (e) {
            throw new AuthorizationError(EHttpResponseStatus.INTERNAL_SERVER_ERROR, EAuthorizationControllerFailureMessages.EMAIL_DIDNT_SENT);
        }
    };

    /** Метод создаёт access token. */
    private generateAccessToken = (userId: string): string => {
        const payload = {
            userId,
            type: config.authOptions.tokens.access.type,
        };

        const options = {
            expiresIn: config.authOptions.tokens.access.expiresIn,
        };

        return jwt.sign(payload, config.authOptions.jwtSecret, options);
    };

    /** Метод создаёт refresh token. */
    private generateRefreshToken = (): IGenerateRefreshTokenResponse => {
        const payload = {
            id: `${Math.random()}`,
            type: config.authOptions.tokens.refresh.type,
        };

        const options = {
            expiresIn: config.authOptions.tokens.refresh.expiresIn,
        };

        return {
            id: payload.id,
            token: jwt.sign(payload, config.authOptions.jwtSecret, options),
        };
    };

    /** Метод заменяет refresh token для пользователя. */
    private replaceDbRefreshToken = (token: string, userId: string): Promise<ITokenSchema> =>
        TokenSchema.findOneAndRemove({userId}).then(() => {
            logger.info(NAMESPACE, 'Refresh token removed from DB');
            return TokenSchema.create({token, userId});
        });

    /** Метод создает пару токенов для пользователя. */
    private issueTokenPair = async (userId: string): Promise<IIssueTokenPairResponse> => {
        const accessToken = this.generateAccessToken(userId);
        const refreshToken = this.generateRefreshToken();

        await this.replaceDbRefreshToken(refreshToken.token, userId);

        logger.info(NAMESPACE, 'New tokens for user: ', {
            accessToken,
            refreshToken,
        });

        return {
            accessToken,
            refreshToken: refreshToken.token,
        };
    };

    registration = async (email: string, username: string, password: string): Promise<void> => {
        const candidate: IUser = await UserSchema.findOne({
            $or: [{username: {$regex: username, $options: 'i'}}, {email: {$regex: email, $options: 'i'}}],
        });

        if (candidate) {
            throw new AuthorizationError(EHttpResponseStatus.BAD_REQUEST, EAuthorizationControllerFailureMessages.USER_ALREADY_EXISTS);
        }

        const user = await UserSchema.create({
            username,
            email: email.toLowerCase(),
            password: bcrypt.hashSync(password, 10),
        });

        this.verifyByEmail(user);

        return;
    }

    activate = async (activateToken: string): Promise<void> => {
        const {userId} = await TokenService.validateActivateToken(activateToken);

        const user = await UserSchema.findById(userId);

        if (!user) {
            throw AuthorizationError.BadRequest(EAuthorizationControllerFailureMessages.INVALID_TOKEN);
        }

        if (user.isActivate) {
            throw new AuthorizationError(EHttpResponseStatus.BAD_REQUEST, EAuthorizationControllerFailureMessages.USER_ALREADY_VERIFIED);
        }

        user.isActivate = true;
        user.save();

        return;
    }

    login = async (login: string, password: string): Promise<ILoginServiceResponse> => {
        const user = await UserSchema.findOne({
            $or: [
                {username: {$regex: login, $options: 'i'}},
                {email: {$regex: login, $options: 'i'}},
            ],
        });

        if (!user || bcrypt.compareSync(password, user.password)) {
            throw AuthorizationError.UnauthorizedError(EAuthorizationControllerFailureMessages.INVALID_CREDENTIALS);
        }

        if (!user.isActivate) {
            throw AuthorizationError.BadRequest(EAuthorizationControllerFailureMessages.USER_IS_NOT_VERIFIED);
        }

        const {accessToken, refreshToken} = await this.issueTokenPair(user._id);

        return {
            accessToken,
            refreshToken,
            user,
        }
    }

    refresh = async (refreshToken: string): Promise<IIssueTokenPairResponse> => {
        await TokenService.validateRefreshToken(refreshToken);

        const token = await TokenSchema.findOne({token: refreshToken}).exec();

        if (token === null) {
            logger.info(NAMESPACE, 'Refresh', 'Token not found');

            throw AuthorizationError.BadRequest(EAuthorizationControllerFailureMessages.INVALID_TOKEN);
        }

        return await this.issueTokenPair(token.userId);
    }

    logout = async (token: string): Promise<void> => {
        await TokenService.validateRefreshToken(token);

        await TokenSchema.deleteOne({token});

        return;
    }
}

export default new UserService();
