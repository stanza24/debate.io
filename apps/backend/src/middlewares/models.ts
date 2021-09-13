import type {NextFunction, Request, Response} from 'express';

/** Типы мидлвар сервера. */
export type TResponseMiddleware = (req: Request, res: Response, next: NextFunction) => void | Response;
export type TErrorMiddleware<T = Error> = (err: T, req: Request, res: Response, next: NextFunction) => void | Response;
export type TMiddleware<T = Error> = TResponseMiddleware | TErrorMiddleware<T>;
export type TMiddlewareRow = TMiddleware[];
