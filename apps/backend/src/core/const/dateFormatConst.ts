/** Формат года. */
export const YEAR_FORMAT = 'YYYY';
/** Формат месяца. */
export const MONTH_FORMAT = 'MM';
/** Формат месяца по имени. */
export const NAME_MONTH_FORMAT = 'MMMM';
/** Формат дня. */
export const DAY_FORMAT = 'DD';
/** Формат часов. */
export const HOURS_FORMAT = 'HH';
/** Формат минут. */
export const MINUTES_FORMAT = 'mm';
/** Формат секунд. */
export const SECONDS_FORMAT = 'ss';

/** Формат даты, приходящий с сервера. */
export const SERVER_DATE_FORMAT = `${YEAR_FORMAT}${MONTH_FORMAT}${DAY_FORMAT}`;
/** Формат даты, приходящий с сервера вместе со временем. */
export const SERVER_DATETIME_FORMAT = `${SERVER_DATE_FORMAT}T${HOURS_FORMAT}${MINUTES_FORMAT}${SECONDS_FORMAT}`;
/** Формат даты, отображаемый на клиентской части. */
export const CLIENT_DATE_FORMAT = `${DAY_FORMAT}.${MONTH_FORMAT}.${YEAR_FORMAT}`;
/** Формат даты для логгирования на сервере. */
export const SERVER_LOGGING_FORMAT = `${DAY_FORMAT}.${MONTH_FORMAT}.${YEAR_FORMAT} ${HOURS_FORMAT}:${MINUTES_FORMAT}:${SECONDS_FORMAT}`;
