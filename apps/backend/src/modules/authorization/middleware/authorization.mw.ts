import type {NextFunction, Request, Response} from 'express';
import {logger} from 'services/logger';
import TokenService from '../services/token.service';

/**
 * Middleware checks access token.
 */
const mwAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.Authorization;

    logger.info('Authorization MW', 'Access Token', accessToken);

    try {
        await TokenService.validateAccessToken(accessToken)
    } catch (e) {
        next(e);
    }

    next();
};

export default mwAuthorization;
