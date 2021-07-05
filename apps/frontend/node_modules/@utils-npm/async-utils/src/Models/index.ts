import {EProcessStatus} from '../Enums';

/**
 * Общий интерфейс любых ошибок возникших в результате обращения к серверу.
 *
 * @prop timestamp Таймштамп ошибки.
 * @prop uniqueCode Уникальный код ошибки.
 * @prop [errorStatus] Заголовок ошибки.
 * @prop [systemMessage] Серверное описание ошибки.
 * @prop [clientMessage] Клиентское описание ошибки.
 */
export interface IServerErrorsResult {
    timestamp: string;
    uniqueCode: string;
    errorStatus?: string;
    systemMessage?: string;
    clientMessage?: string;
}

/**
 * Общий интерфейс любых ошибок возникших в результате обращения к серверу.
 *
 * @prop httpCode Код ответа на HTTP запрос.
 * @prop timestamp Таймштамп ошибки.
 * @prop uniqueCode Уникальный код ошибки.
 * @prop [errorStatus] Заголовок ошибки.
 * @prop [systemMessage] Серверное описание ошибки.
 * @prop [clientMessage] Клиентское описание ошибки.
 */
export interface IErrorsResult extends IServerErrorsResult {
    httpCode: number;
}

/**
 * Интерфейс контейнера блока асинхронных данных, для обмена между клиентом и сервером.
 *
 * @prop status Статус процесса загрузки асинхронных данных.
 * @prop data Данные.
 * @prop [errors] Ошибка.
 */
export interface IAsyncData<TData = unknown, TErrors = IErrorsResult> {
    status: EProcessStatus;
    data: TData | null;
    errors?: TErrors;
}
