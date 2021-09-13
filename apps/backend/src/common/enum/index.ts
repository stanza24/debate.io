/**
 * Статусы ответа на HTTP-запрос.
 */
export enum EHttpResponseStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

/**
 * Модель сообщений ошибок от сервера.
 *
 * INTERNAL_SERVER_ERROR - Неизвестная ошибка на сервере.
 */
export enum EHttpFailureMessages {
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}