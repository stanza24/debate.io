import jwt, {JwtPayload} from "jsonwebtoken";
import {config} from "config/app.config";
import {AuthorizationError} from "../exceptions";
import {EAuthorizationControllerFailureMessages} from "../enum/authorization.enum";
import {logger} from "services/logger";
import {IActivateToken, IRefreshToken} from "../types/token.types";

const NAMESPACE = 'TOKEN_SERVICE';

class TokenService {
    validateAccessToken = async (token: string): Promise<void> => {
        if (!token) {
            throw AuthorizationError.UnauthorizedError(EAuthorizationControllerFailureMessages.USER_IS_UNAUTHORIZED);
        }

        let payload;

        try {
            payload = jwt.verify(token, config.authOptions.jwtSecret);
        } catch (e) {
            if (e instanceof jwt.TokenExpiredError || e instanceof jwt.JsonWebTokenError) {
                logger.info('Validate access token', 'Expired token');

                throw AuthorizationError.UnauthorizedError(EAuthorizationControllerFailureMessages.USER_IS_UNAUTHORIZED);
            }
        }

        if ((payload as JwtPayload).type !== config.authOptions.tokens.access.type) {
            logger.info(NAMESPACE, 'Validate access token', 'Invalid token type');

            throw AuthorizationError.UnauthorizedError(EAuthorizationControllerFailureMessages.USER_IS_UNAUTHORIZED);
        }

        return;
    }

    validateRefreshToken = async (token: string): Promise<IRefreshToken> => {
        let payload;

        try {
            payload = jwt.verify(token, config.authOptions.jwtSecret);
        } catch (e) {
            if (e instanceof jwt.TokenExpiredError || e instanceof jwt.JsonWebTokenError) {
                throw AuthorizationError.BadRequest(EAuthorizationControllerFailureMessages.INVALID_TOKEN);
            }

            throw e;
        }

        if (payload.type !== config.authOptions.tokens.refresh.type) {
            logger.info(NAMESPACE, 'Validate refresh token', 'Invalid token type');

            throw AuthorizationError.BadRequest(EAuthorizationControllerFailureMessages.INVALID_TOKEN);
        }

        return payload;
    }

    validateActivateToken = async (token: string): Promise<IActivateToken> => {
        let payload;

        try {
            payload = jwt.verify(token, config.authOptions.jwtSecret);
        } catch (e) {
            if (e instanceof jwt.TokenExpiredError || e instanceof jwt.JsonWebTokenError) {
                throw AuthorizationError.BadRequest(EAuthorizationControllerFailureMessages.INVALID_TOKEN);
            }

            throw e;
        }

        if (payload.type !== config.authOptions.tokens.activate.type || !payload.userId) {
            throw AuthorizationError.BadRequest(EAuthorizationControllerFailureMessages.INVALID_TOKEN);
        }

        return payload;
    }
}

export default new TokenService();
