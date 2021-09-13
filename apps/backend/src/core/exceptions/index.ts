import { EHttpResponseStatus } from "common/enum";

/**
 * Class of API errors.
 */
export class ApiError extends Error {
    status;
    errors;

    constructor(status: EHttpResponseStatus, message: string, errors: string[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}
