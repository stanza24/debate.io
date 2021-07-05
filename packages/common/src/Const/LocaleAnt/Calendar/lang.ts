import {DAY_FORMAT, FRONTEND_DATETIME_FORMAT, FRONTEND_DATE_FORMAT, YEAR_FORMAT} from '@utils-npm/helper-utils/src';
import ruRU from 'antd/lib/locale/ru_RU';

export const lang = {
    // @ts-ignore Типизация переводов оставляет желать лучшего, календарь представлен как объект
    ...ruRU.Calendar?.lang,
    yearFormat: YEAR_FORMAT,
    dateFormat: FRONTEND_DATE_FORMAT,
    dayFormat: DAY_FORMAT,
    dateTimeFormat: FRONTEND_DATETIME_FORMAT,
};
