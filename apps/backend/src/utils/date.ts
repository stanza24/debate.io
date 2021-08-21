import moment from 'moment';
import {SERVER_LOGGING_FORMAT} from '../const/dateFormatConst';

/** Функция возвращает таймштамп в формате для логгирования. */
export const getLoggingTimeStamp = (): string => {
    return moment().format(SERVER_LOGGING_FORMAT);
};
