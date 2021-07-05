import {DAY_FORMAT, FRONTEND_DATETIME_FORMAT, FRONTEND_DATE_FORMAT, YEAR_FORMAT} from '@utils-npm/helper-utils/src';
import {AdditionalPickerLocaleLangProps} from 'antd/lib/date-picker/generatePicker';
import ruRU from 'antd/lib/locale/ru_RU';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Locale as RcPickerLocale} from 'rc-picker/lib/interface';

export const lang: RcPickerLocale & AdditionalPickerLocaleLangProps = {
    ...ruRU.DatePicker.lang,
    yearFormat: YEAR_FORMAT,
    dateFormat: FRONTEND_DATE_FORMAT,
    dayFormat: DAY_FORMAT,
    dateTimeFormat: FRONTEND_DATETIME_FORMAT,
};
