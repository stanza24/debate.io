import moment from 'moment';
import type {Moment} from 'moment';
import {
    CALENDAR_INPUT_DATE_FORMAT,
    FRONTEND_DATE_FORMAT,
    FRONTEND_TIME_FORMAT,
    PRETTY_FRONTEND_DATE_FORMAT,
    SERVER_DATETIME_FORMAT,
    SERVER_DATE_FORMAT,
} from '../../Const';
import 'moment/locale/ru'; // without this line it didn't work

moment.locale('ru');

/**
 * Переводит переданную строку дату (время) в js Date.;
 *
 * @param dateString Дата.
 * @param [format] формат даты времени передаваемый с сервера по умолчанию serverFormat.
 * @param [strict] Тип приведения дат.
 */
export const strToMoment = (dateString: string, format: string = SERVER_DATE_FORMAT, strict = false): Moment =>
    moment(dateString, format, strict);

/**
 * Переводит переданную серверную дату в js Date.;
 *
 * @param dateString Дата.
 */
export const serverDateToMoment = (dateString: string): Moment => strToMoment(dateString, SERVER_DATE_FORMAT);

/**
 * Переводит переданную серверную дата-время в js Date.;
 *
 * @param dateString Дата.
 */
export const serverDatetimeToMoment = (dateString: string): Moment => strToMoment(dateString, SERVER_DATETIME_FORMAT);

/**
 * Интерфейс параметров даты.
 *
 * @prop [convertComingDate] Требуется ли преобразовывать ближайшие даты.
 * @prop [prettyFormatDate] Требуется ли показывать даты с названием месяца.
 */
interface IRuDateConfig {
    convertComingDate?: boolean;
    prettyFormatDate?: boolean;
}

/**
 * Возвращает дату в формате "ДД.ММ.ГГГГ";
 *
 * @param fullDate полная дата
 * @param dateConfig Правила показа даты.
 */
export const getRuDate = (
    fullDate: string | Moment,
    dateConfig: IRuDateConfig = {convertComingDate: false, prettyFormatDate: false}
): string => {
    const format = dateConfig.prettyFormatDate ? PRETTY_FRONTEND_DATE_FORMAT : FRONTEND_DATE_FORMAT;

    if (dateConfig.convertComingDate) {
        const today = moment();
        return moment(fullDate).calendar(today, {
            sameElse: format,
            sameDay: '[Сегодня]',
            lastDay: '[Вчера]',
        });
    }

    return moment(fullDate).format(format);
};

/**
 * Возвращает время в формате "ЧЧ:ММ";
 *
 * @param fullDate полная дата
 */
export const getRuTime = (fullDate: string | Moment): string => moment(fullDate).format(FRONTEND_TIME_FORMAT);

/**
 * Возвращает сегодняшнюю дату объектом Moment
 */
export const getTodayDate = (): Moment => moment();

/**
 * Возвращает дату в формате ГГГГ-ММ-ДД для календарного инпута
 *
 * @param fullDate дата строкой или объектом Moment
 */
export const getInputDate = (fullDate: string | Moment): string => moment(fullDate).format(CALENDAR_INPUT_DATE_FORMAT);

/**
 * Возвращает дату в формате YYYYMMDDTHHmm для передачи по JSON
 *
 * @param [fullDate] дата строкой или объектом Moment
 * @param [format] В каком формате приходят данные
 */
export const getJSONDate = (fullDate?: string | Moment, format?: string): string =>
    (format ? moment(fullDate, format) : moment(fullDate)).format(SERVER_DATETIME_FORMAT);

/**
 * Возвращает текущие дату и время в формате YYYYMMDDTHHmmss для передачи по JSON.
 */
export const getJSONTodayDate = (): string => getTodayDate().format(SERVER_DATETIME_FORMAT);

/**
 * Возвращает интервал между датами в разбивке по дням, часам, минутам.
 *
 * @param earlyDate Ранняя дата.
 * @param lDate Поздняя дата.
 */
export const getDiff = (
    earlyDate: string | Moment,
    lDate: string | Moment = getTodayDate()
): {days: number; hours: number; minutes: number} => {
    const laterDate = typeof lDate === 'string' ? strToMoment(lDate) : lDate;
    const days = laterDate.diff(earlyDate, 'days');
    const hours = laterDate.diff(earlyDate, 'hours') - days * 24;
    const minutes = laterDate.diff(earlyDate, 'minutes') - (days * 24 * 60 + hours * 60);
    return {days, hours, minutes};
};

/**
 * Возвращает разницу между датой и текущим моментом
 *
 * @param fullDate дата строкой или объектом момент
 */
export const timeFromNow = (fullDate: string | Moment): string => {
    moment.updateLocale('ru', {});
    return moment(fullDate).fromNow(true);
};
