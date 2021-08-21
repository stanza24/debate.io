import type {NextFunction, Request, Response} from 'express';
import {EHttpResponseStatus} from '../../../Core/Enum/httpEnum';
import {EAuthorizationControllerFailureMessages} from '../enum/authorization.enum';
import {logger} from '../../../services/logger';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {appConfig} from '../../../config/appConfig';

/** Миддлвара проверяет токен авторизации. */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.Authorization;

    if (!accessToken) {
        return res.status(EHttpResponseStatus.UNAUTHORIZED).json({
            message: EAuthorizationControllerFailureMessages.USER_IS_UNAUTHORIZED,
        });
    }

    logger.info('JWT Middleware', 'Access Token', accessToken);

    try {
        const payload = jwt.verify(accessToken, appConfig.authOptions.jwtSecret);
        if ((payload as JwtPayload).type !== appConfig.authOptions.tokens.access.type) {
            logger.info('JWT Middleware', 'Invalid token type');

            return res.status(EHttpResponseStatus.UNAUTHORIZED).json({
                message: EAuthorizationControllerFailureMessages.USER_IS_UNAUTHORIZED,
            });
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError || e instanceof jwt.JsonWebTokenError) {
            logger.info('JWT Middleware', 'Expired token');

            return res.status(EHttpResponseStatus.UNAUTHORIZED).json({
                message: EAuthorizationControllerFailureMessages.USER_IS_UNAUTHORIZED,
            });
        }
    }

    next();
};
