import {PickerLocale as DatePickerLocale} from 'antd/lib/date-picker/generatePicker';
import ruRU from 'antd/lib/locale/ru_RU';
import {lang} from './lang';

export const DatePicker: DatePickerLocale = {
    ...ruRU.DatePicker,
    lang,
};
