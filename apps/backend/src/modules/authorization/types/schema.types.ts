import mongoose from "mongoose";

/**
 * Модель схемы рефреш токена.
 *
 * @prop token Токен.
 * @prop userId Идентификатор пользователя.
 */
export interface ITokenSchema extends mongoose.Document {
    token: string;
    userId: string;
}
