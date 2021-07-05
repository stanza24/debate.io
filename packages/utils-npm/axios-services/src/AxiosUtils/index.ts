import type {IErrorsResult, IServerErrorsResult} from '@utils-npm/async-utils/src';
import type {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import axios from 'axios';
import {debounce, isBoolean, isFunction, isPlainObject} from 'lodash';
import {DEFAULT_SERVICE_MOCK_DELAY} from '../Const';
import {ERestMethods} from '../Enums';
import type {
    IRequestProperty,
    IRequestPropertyWithData,
    IServiceMockDelay,
    IServiceSource,
    TMockCallbackServiceSimulator,
} from '../Models';

/**
 * Иинтерфейс ошибок api возникших в результате обращения к серверу.
 */
// export interface IApiError {
//     debugMessage: string;
//     status: string;
//     timestamp: string;
//     message: string;
// }

/**
 * Функция возвращает случайное число от 0 до max.
 *
 * @param [min] Минимальное значение случайного положительного числа - по умолчанию 100.
 * @param [max] Максимальное значение случайного положительного числа - по умолчанию 100.
 */
export const randomInteger = (min = 0, max = 100): number => Math.round(Math.random() * (max - min) + min);

/**
 * Функция для получения данных из моков, с возможностью подмены данных, для симулирования поведения реального сервиса.
 *
 * @param source путь до JSON.
 * @param requestConfig Конфигурация запроса.
 * @param serviceMockDelay Требуется ли задержка для возврата данных мока.
 * @param [mockCallbackServiceSimulator] Колбек симулятор поведения сервиса, для подмены данных JSON.
 */
const getMockData = <TResponse>(
    source: string,
    requestConfig: AxiosRequestConfig,
    serviceMockDelay: boolean | IServiceMockDelay = false,
    mockCallbackServiceSimulator?: TMockCallbackServiceSimulator<TResponse>
): Promise<AxiosResponse<TResponse>> => {
    const mockDelay = isBoolean(serviceMockDelay) && serviceMockDelay ? DEFAULT_SERVICE_MOCK_DELAY : serviceMockDelay;

    const axiosPromise = mockDelay
        ? axios.get(source, requestConfig).then(
              async (axiosResponse: AxiosResponse<TResponse>): Promise<AxiosResponse<TResponse>> => {
                  await new Promise<void>((resolve) =>
                      debounce(
                          resolve,
                          randomInteger(
                              (mockDelay as IServiceMockDelay).minDelay,
                              (mockDelay as IServiceMockDelay).maxDelay
                          )
                      )()
                  );

                  return axiosResponse;
              }
          )
        : axios.get(source);

    if (mockCallbackServiceSimulator) {
        return axiosPromise.then(
            (axiosResponse: AxiosResponse<TResponse>): AxiosResponse<TResponse> => ({
                ...axiosResponse,
                data: mockCallbackServiceSimulator(axiosResponse.data),
            })
        );
    }

    return axiosPromise;
};

/**
 * Обработка ошибки при запросе данных.
 *
 * @param axiosError Информация об ошибке.
 */
const prepareAxiosError = (axiosError: AxiosError<IServerErrorsResult>) => {
    // Если есть ответ, стараемся сгенерировать правильное тело ошибки
    if (axiosError.response) {
        const {data: serverErrorData, status: httpCode} = axiosError.response;
        // Предположительно, сервер всегда пришлет IServerErrorsResult, но лучше проверить.
        //  TODO заменить следующий блок, после исправления костыля с apierror
        if (isPlainObject(serverErrorData) && Object.prototype.hasOwnProperty.call(serverErrorData, 'uniqueCode')) {
            // eslint-disable-next-line no-throw-literal
            throw {
                ...serverErrorData,
                httpCode,
            } as IErrorsResult;
            // if (isPlainObject(serverErrorData) && Object.prototype.hasOwnProperty.call(serverErrorData, 'apierror')) {
            //     const {
            //         debugMessage: systemMessage,
            //         status: errorStatus,
            //         timestamp,
            //         message: clientMessage,
            //     } = ((serverErrorData as unknown) as {
            //         apierror: IApiError;
            //     }).apierror;
            //
            //     // eslint-disable-next-line no-throw-literal
            //     throw {
            //         httpCode,
            //         timestamp,
            //         uniqueCode: '',
            //         errorStatus,
            //         systemMessage,
            //         clientMessage,
            //     } as IErrorsResult;
        } else {
            // eslint-disable-next-line no-throw-literal
            throw {
                httpCode,
                timestamp: String(Date.now()),
                uniqueCode: 'UNKNOWN_ERROR_SERVER_SIDE_HAS_INCORRECT_ERROR_BODY',
            } as IErrorsResult;
        }
    }

    // eslint-disable-next-line no-throw-literal
    throw {
        httpCode: 400,
        timestamp: String(Date.now()),
        uniqueCode: 'UNKNOWN_ERROR_SERVER_SIDE_HAS_NOT_ERROR_BODY',
    } as IErrorsResult;
};

/**
 * Создатель обработчика показа нотификации об ошибке.
 *
 * @param requestProperty Параметры формируемого запроса.
 */
const getHandleShowErrorNotification = <TResponse, TData = unknown>(
    requestProperty: IRequestPropertyWithData<TResponse, TData> | IRequestProperty<TResponse>
) =>
    /**
     * Обработчик показа нотификации об ошибке.
     *
     * @param error Информация об ошибке.
     */
    (error: IErrorsResult) => {
        if (requestProperty.serviceErrorNotification) {
            if (isFunction(requestProperty.serviceErrorNotification)) {
                requestProperty.serviceErrorNotification(error);
            }
        }

        throw error;
    };

/**
 * Небольшая обёртка над промисом axios, служит для того чтобы избавляться от ненужного мусора при запросах.
 *
 * @param axiosPromise Промис который возвращает axios.
 */
const cleanAxiosPromise = <TResponse = unknown>(axiosPromise: Promise<AxiosResponse<TResponse>>): Promise<TResponse> =>
    axiosPromise.then((axiosResponse: AxiosResponse<TResponse>): TResponse => axiosResponse.data);

/**
 * Выясняем можем ли мы вызвать моки.
 *
 * @param source Источник данных.
 */
const hasCanCallMock = (
    source: IServiceSource
): source is Omit<IServiceSource, 'mock'> & Required<Pick<IServiceSource, 'mock'>> => source.mock !== undefined;

/**
 * Выясняем можем ли мы взять data из параметров запроса.
 *
 * @param requestProperty Параметры формируемого запроса.
 */
const hasDataInRequestProperty = <TResponse, TData = unknown>(
    requestProperty: IRequestPropertyWithData<TResponse, TData> | IRequestProperty<TResponse>
): requestProperty is IRequestPropertyWithData<TResponse, TData> =>
    (requestProperty as IRequestPropertyWithData<TResponse, TData>).data !== undefined;

/**
 * Выясняем можем ли мы взять data из параметров запроса.
 *
 * @param requestProperty Параметры формируемого запроса.
 */
const getDataFromRequestProperty = <TResponse, TData = unknown>(
    requestProperty: IRequestPropertyWithData<TResponse, TData> | IRequestProperty<TResponse>
): TData | undefined => (hasDataInRequestProperty(requestProperty) ? requestProperty.data : undefined);

/**
 * Фабрика отправки запроса на сервер.
 *
 * @param method Метод отправки данных.
 * @param requestProperty Параметры формируемого запроса.
 */
const axiosRequestFabric = <TResponse, TData = unknown>(
    method: ERestMethods,
    requestProperty: IRequestPropertyWithData<TResponse, TData> | IRequestProperty<TResponse>
): Promise<AxiosResponse<TResponse>> => {
    let responsePromise: Promise<AxiosResponse<TResponse>>;
    const {source, config, params} = requestProperty;

    /**
     * Собираем общий объект конфигурации запроса.
     */
    const responseConfiguration: AxiosRequestConfig = {
        ...config,
        ...(params ? {params} : {}),
        withCredentials: true,
    };

    if (source.forceMock && hasCanCallMock(source)) {
        const {serviceMockDelay, mockCallbackServiceSimulator} = requestProperty;

        responsePromise = getMockData(
            source.mock,
            responseConfiguration,
            serviceMockDelay,
            mockCallbackServiceSimulator
        );
    } else {
        switch (method) {
            case ERestMethods.POST:
                responsePromise = axios.post(
                    source.url,
                    getDataFromRequestProperty(requestProperty),
                    responseConfiguration
                );
                break;

            case ERestMethods.GET:
                responsePromise = axios.get(source.url, responseConfiguration);
                break;
            case ERestMethods.DELETE:
                responsePromise = axios.delete(source.url, {
                    data: getDataFromRequestProperty(requestProperty),
                    ...responseConfiguration,
                });
                break;

            case ERestMethods.PATCH:
                responsePromise = axios.patch(
                    source.url,
                    getDataFromRequestProperty(requestProperty),
                    responseConfiguration
                );
                break;

            case ERestMethods.PUT:
                responsePromise = axios.put(
                    source.url,
                    getDataFromRequestProperty(requestProperty),
                    responseConfiguration
                );
                break;
        }
    }

    if (responsePromise) {
        return responsePromise.catch(prepareAxiosError).catch(getHandleShowErrorNotification(requestProperty));
    }

    throw new Error('Не удалось выполнить запрос на сервер, не указаны необходимые параметры.');
};

/**
 * Отправить данные методом POST, или запросить моки.
 *
 * @param method Метод отправки данных.
 * @param requestProperty Параметры формируемого запроса.
 */
const requestAxios = <TResponse, TData = unknown>(
    method: ERestMethods,
    requestProperty: IRequestPropertyWithData<TResponse, TData> | IRequestProperty<TResponse>
): Promise<TResponse> => cleanAxiosPromise<TResponse>(axiosRequestFabric<TResponse, TData>(method, requestProperty));

/**
 * Отправить данные методом POST, или запросить моки.
 *
 * @param requestProperty Параметры формируемого запроса.
 */
export const POST = <TResponse, TData = unknown>(
    requestProperty: IRequestPropertyWithData<TResponse, TData>
): Promise<TResponse> => requestAxios<TResponse, TData>(ERestMethods.POST, requestProperty);

/**
 * Запросить данные методом GET, или запросить моки.
 *
 * @param requestProperty Параметры формируемого запроса.
 */
export const GET = <TResponse>(requestProperty: IRequestProperty<TResponse>): Promise<TResponse> =>
    requestAxios<TResponse>(ERestMethods.GET, requestProperty);

/**
 * Удалить данные методом DELETE, или запросить моки.
 *
 * @param requestProperty Параметры формируемого запроса.
 */
export const DELETE = <TResponse, TData = unknown>(
    requestProperty: IRequestPropertyWithData<TResponse, TData> | IRequestProperty<TResponse>
): Promise<TResponse> => requestAxios<TResponse, TData>(ERestMethods.DELETE, requestProperty);

/**
 * Обновить данные методом PATCH, или запросить моки.
 *
 * @param requestProperty Параметры формируемого запроса.
 */
export const PATCH = <TResponse, TData = unknown>(
    requestProperty: IRequestPropertyWithData<TResponse, TData>
): Promise<TResponse> => requestAxios<TResponse, TData>(ERestMethods.PATCH, requestProperty);

/**
 * Добавить данные методом PUT, или запросить моки.
 *
 * @param requestProperty Параметры формируемого запроса.
 */
export const PUT = <TResponse, TData = unknown>(
    requestProperty: IRequestPropertyWithData<TResponse, TData>
): Promise<TResponse> => requestAxios<TResponse, TData>(ERestMethods.PUT, requestProperty);

/**
 * Скачать файл методом GET, или запросить мок файл.
 *
 * @param requestProperty Параметры формируемого запроса.
 */
export const downLoadFile = <TData = unknown>(
    requestProperty: IRequestProperty<BlobPart> | IRequestPropertyWithData<BlobPart, TData>
): Promise<unknown> => {
    const downloadRequestProperty: IRequestProperty<BlobPart> | IRequestPropertyWithData<BlobPart, TData> = {
        ...requestProperty,
        config: {
            responseType: 'blob',
            ...requestProperty.config,
        },
    };

    return axiosRequestFabric<BlobPart>(
        hasDataInRequestProperty(downloadRequestProperty) ? ERestMethods.POST : ERestMethods.GET,
        downloadRequestProperty
    ).then((response) => {
        const contentType = response.headers['content-type'];
        const blob = new Blob([response.data], {type: contentType});
        const downloadUrl = window.URL.createObjectURL(blob);
        const disposition: string = response.headers['content-disposition'];
        let filename = '';

        if (disposition && disposition.includes('attachment')) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);

            if (matches !== null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }

        const a = document.createElement('a');
        if (typeof a.download === 'undefined') {
            window.location.href = downloadUrl;
        } else {
            a.href = downloadUrl;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
        }
    });
};
