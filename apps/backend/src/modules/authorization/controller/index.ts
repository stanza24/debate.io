import type {NextFunction, Request, Response} from 'express';
import {
    EAuthorizationControllerSuccessMessages,
} from '../enum/authorization.enum';
import {logger} from 'services/logger';
import {ROUTE} from 'core/const/routeConst';
import UserService from "../services/authorization.service";
import {EHttpResponseStatus} from "common/enum";
import { UserDto } from 'common/dto/user.dto';

const NAMESPACE = 'AuthorizationController';

class AuthorizationController {
    /** Метод обработки запроса регистрации. */
    registration = async (req: Request, res: Response, next: NextFunction) => {
        logger.info(NAMESPACE, 'Registration', req.body);

        const {email, username, password} = req.body;

        try {
            await UserService.registration(email, username, password);

            return res.status(EHttpResponseStatus.OK).json(EAuthorizationControllerSuccessMessages.USER_CREATED);
        } catch (e) {
            next(e);
        }
    };

    /** Метод обработки запроса верификации. */
    activate = async (req: Request, res: Response, next: NextFunction) => {
        logger.info(NAMESPACE, 'Verify', {
            token: req.query.token,
        });

        try {
            await UserService.activate(req.query.token as unknown as string);

            return res.redirect(ROUTE.SERVER.PATH);
        } catch (e) {
            next(e);
        }
    };

    /** Метод обработки запроса аутентификации. */
    login = async (req: Request, res: Response, next: NextFunction) => {
        logger.info(NAMESPACE, 'Login', req.body);

        const {login, password} = req.body;

        try {
            const {accessToken, refreshToken, user} = await UserService.login(login, password);

            res.cookie('Authorization', accessToken);
            res.cookie('RefreshToken', refreshToken, {maxAge: 60*24*60*60*1000, httpOnly: true});

            return res.status(EHttpResponseStatus.OK).json(new UserDto(user));
        } catch (e) {
            next(e);
        }
    };

    /** Метод обработки запроса обновления рефреш-токена. */
    refresh = async (req: Request, res: Response, next: NextFunction) => {
        const {Authorization, RefreshToken} = req.cookies;

        logger.info(NAMESPACE, 'Refresh', {
            accessToken: Authorization,
            refreshToken: RefreshToken,
        });

        try {
            const {accessToken, refreshToken} = await UserService.refresh(RefreshToken);

            res.cookie('Authorization', accessToken);
            res.cookie('RefreshToken', refreshToken);

            return res.status(EHttpResponseStatus.OK).json({});
        } catch (e) {
            next(e);
        }
    };

    /** Метод обработки запроса выхода из системы. */
    logout = async (req: Request, res: Response, next: NextFunction) => {
        logger.info(NAMESPACE, 'Logout');

        const {RefreshToken} = req.cookies;

        try {
            await UserService.logout(RefreshToken);

            res.clearCookie('Authorization');
            res.clearCookie('RefreshToken');

            return res.status(EHttpResponseStatus.OK).json({
                success: true,
                message: EAuthorizationControllerSuccessMessages.SUCCESSFUL_LOGOUT,
            });
        } catch (e) {
            next(e);
        }
    };
}

export const authorizationController = new AuthorizationController();
