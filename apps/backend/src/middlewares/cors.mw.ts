import {config} from 'config/app.config';
import cors from 'middlewares/cors.mw';
import {TResponseMiddleware} from './models';

const mwCors: TResponseMiddleware = cors(config.corsOptions);

export default mwCors;
