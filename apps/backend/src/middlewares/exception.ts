import {ApiError} from "core/exceptions";
import {EHttpFailureMessages, EHttpResponseStatus} from "common/enum";
import type {NextFunction, Request, Response} from "express";

/**
 * Middleware controlling exceptions for user.
 */
const mwException = <T = Error>(err: T, req: Request, res: Response, _next: NextFunction): Response => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
            errors: err.errors,
        })
    }

    return res.status(EHttpResponseStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: EHttpFailureMessages.INTERNAL_SERVER_ERROR,
    })
}

export default mwException;
