import type {NextFunction, Request, Response} from 'express';

/** Типы мидлвар сервера. */
export type TMiddleware = (req: Request, res: Response, next: NextFunction) => void | Response | TMiddleware[];
export type TMiddlewareRow = TMiddleware[];
