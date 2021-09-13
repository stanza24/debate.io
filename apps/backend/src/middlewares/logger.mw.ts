import type {TResponseMiddleware} from './models';
import type {NextFunction, Request, Response} from 'express';
import {logger} from 'services/logger';

const mwLogger: TResponseMiddleware = (req: Request, res: Response, next: NextFunction): void => {
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
