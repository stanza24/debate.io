import {TMiddleware} from './models';
import {NextFunction, Request, Response} from 'express';
import {logger} from '../services/logger';

const mwLogger: TMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Logging request
    logger.info('Server', `<- METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        // Logging response
        logger.info(
            'Server',
            `-> METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
    });

    next();
};

export default mwLogger;
