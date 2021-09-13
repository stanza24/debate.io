import colors from 'colors';
import {getLoggingTimeStamp} from 'utils/date';

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.log(`[${getLoggingTimeStamp()}] ${colors.blue('INFO')} [${namespace}] ${message}`, object);
    } else {
        console.log(`[${getLoggingTimeStamp()}] ${colors.blue('INFO')} [${namespace}] ${message}`);
    }
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.warn(`[${getLoggingTimeStamp()}] ${colors.yellow('WARN')} [${namespace}] ${message}`, object);
    } else {
        console.warn(`[${getLoggingTimeStamp()}] ${colors.yellow('WARN')} [${namespace}] ${message}`);
    }
};

const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.error(`[${getLoggingTimeStamp()}] ${colors.red('ERROR')} [${namespace}] ${message}`, object);
    } else {
        console.error(`[${getLoggingTimeStamp()}] ${colors.red('ERROR')} [${namespace}] ${message}`);
    }
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.debug(`[${getLoggingTimeStamp()}] ${colors.cyan('DEBUG')} [${namespace}] ${message}`, object);
    } else {
        console.debug(`[${getLoggingTimeStamp()}] ${colors.cyan('DEBUG')} [${namespace}] ${message}`);
    }
};

export const logger = {
    info,
    warn,
    error,
    debug,
};
