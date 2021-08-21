import {appConfig} from '../config/appConfig';
import cors from 'cors';
import {TMiddleware} from './models';

const mwCors: TMiddleware = cors(appConfig.corsOptions);

export default mwCors;
