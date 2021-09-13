import mwBodyParser from './bodyParser.mw';
import mwCors from './cors.mw';
import mwLogger from './logger.mw';
import type {TMiddlewareRow} from './models';
import mwException from "./exception";

export const preMiddlewares: TMiddlewareRow = [...mwBodyParser, mwCors, mwLogger];

export const postMiddlewares: TMiddlewareRow = [mwException];
