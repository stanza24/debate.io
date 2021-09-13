import {EAuthorizationControllerFailureMessages} from "../enum/authorization.enum";
import {ApiError} from "core/exceptions";
import { EHttpResponseStatus } from "common/enum";

/**
 * Class of authorization module's errors;
 */
export class AuthorizationError extends ApiError {
    constructor(status: EHttpResponseStatus, message: string, errors: string[] = []) {
        super(status, message, errors);
    }

    static UnauthorizedError(message: EAuthorizationControllerFailureMessages, errors: string[] = []) {
        return new AuthorizationError(EHttpResponseStatus.UNAUTHORIZED, message, errors)
    }

    static BadRequest(message: EAuthorizationControllerFailureMessages, errors: string[] = []) {
        return new AuthorizationError(EHttpResponseStatus.BAD_REQUEST, message, errors);
    }
}
