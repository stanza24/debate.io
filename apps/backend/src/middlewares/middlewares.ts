import mwBodyParser from './bodyParser';
import mwCors from './cors';
import mwLogger from './logger';
import type {TMiddleware, TMiddlewareRow} from './models';

const middlewares: (TMiddleware | TMiddlewareRow)[] = [mwBodyParser, mwCors, mwLogger];

export default middlewares;
