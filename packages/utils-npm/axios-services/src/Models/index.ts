import type {IErrorsResult} from '@utils-npm/async-utils/src';
import type {AxiosRequestConfig} from 'axios';

/**
 * Интерфейс источника данных для запроса через axios.
 *
 * @prop url адрес REST.
 * @prop mock путь к моку, если restActive is false или forceMock is true.
 * @prop forceMock путь к моку.
 */
export interface IServiceSource {
    url: string;
    mock?: string;
    forceMock?: boolean;
}

/**
 * Интерфейс времени ожидания для получения моков через ServiceWrapper.
 *
 * @prop minDelay Минимальное время ожидания мока.
 * @prop maxDelay Максимальное время ожидания мока.
 */
export interface IServiceMockDelay {
    minDelay: number;
    maxDelay: number;
}

/**
 * Описание типа описывающего необходимость вызова нотификации об ошибке на стороне вызова сервиса.
 */
export type TErrorNotification = (error: IErrorsResult) => void;

/**
 * Описание типа Callback симулятора для runtime генерации моков.
 */
export type TMockCallbackServiceSimulator<TResponse> = (response: TResponse) => TResponse;

/**
 * Добавить данные методом PUT, или запросить моки.
 *
 * @prop source Источник данных.
 * @prop [params] Get параметры запроса.
 * @prop [config] Дополнительная конфигурация для axios, которую можно переопределить.
 * @prop [serviceErrorNotification] Необходимость вызова нотификации об ошибке на стороне вызова сервиса.
 * @prop [serviceMockDelay] Требуется ли задержка для возврата данных мока.
 * @prop [mockCallbackServiceSimulator] Колбек симулятор поведения сервиса, для подмены данных JSON.
 */
export interface IRequestProperty<TResponse> {
    source: IServiceSource;
    params?: TParams;
    config?: IAxiosRequestConfig;
    serviceErrorNotification?: TErrorNotification;
    serviceMockDelay?: boolean | IServiceMockDelay;
    mockCallbackServiceSimulator?: TMockCallbackServiceSimulator<TResponse>;
}

/**
 * Описание объекта для работы с ServiceWrapper, с передачей данных на бекенд.
 *
 * @prop data Данные которые требуется отправить для обновления.
 */
export interface IRequestPropertyWithData<TResponse, TData = unknown> extends IRequestProperty<TResponse> {
    data: TData;
}

/**
 * Интерфейс источника данных для запроса через axios.
 *
 * TODO через Pick выбрать то что можно менять
 */
export interface IAxiosRequestConfig extends Omit<AxiosRequestConfig, 'params'> {}

/**
 * Более жеская типизация params query
 */
export type TParams = {
    [key: string]: string | number | boolean;
};
