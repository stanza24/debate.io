import {DELETE, GET, PATCH, POST, PUT} from '@utils-npm/axios-services/src';
import type {IRequestProperty, IRequestPropertyWithData} from '@utils-npm/axios-services/src';
import axios from 'axios';
import {restActive} from 'Core/Config';

axios.defaults.baseURL = 'http://localhost:4200';
axios.defaults.headers.common['accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

/**
 * Выясняем есть ли необходимость вызвать моки.
 *
 * @param requestProperty Параметры запроса.
 */
const transformRequestPropertyForRestActive = <
    TRequestProperty extends IRequestPropertyWithData<TResponse, TData> | IRequestProperty<TResponse>,
    TResponse,
    TData = unknown
>(
    requestProperty: TRequestProperty
): TRequestProperty => ({
    ...requestProperty,
    source: {
        ...requestProperty.source,
        forceMock: requestProperty.source.forceMock || !restActive,
    },
});

/**
 * Обёртка методов axios для использования в dispatchAsyncResponseBound.
 *
 * @example
 * // Пример использования с симуляцией мока
 * anyActions = (actionId: string) =>
 *     dispatchAsyncResponseBound<IAny>(
 *         this.dispatch,
 *         ActionTypes.ANY_LOAD_ITEM,
 *         ServiceWrapper.GET(
 *             source: {url: MODULE_REST_URL, mock: `${MOCK_URL}/Any/Mock/file.json`},
 *             params: {actionId}, // rest params
 *             serviceMockDelay: true, // simulate rest delay
 *             mockCallbackServiceSimulator: (data) => { // custom function mock creator
 *                 const foundData: IAny = ((data as unknown) as IItemsList<IAny>).items.filter((item) => item.id === actionId)[0];
 *                 if (!foundData) {
 *                      generateMockError({
 *                          timestamp: '20200520T12:31',
 *                          uniqueCode: 'NOT_PERMISSION_FOR_DROP_OPERATION',
 *                          errorStatus: 'Internal server error',
 *                          systemMessage: 'python error drop table row',
 *                          clientMessage: 'Произошла ошибка при удалении стоп слова, недостаточно прав',
 *                      });
 *                 }
 *         return foundData;
 *     })
 * )
 *
 * @param POST создать функцию для отправки POST запроса.
 * @param GET создать функцию для отправки GET запроса.
 * @param DELETE создать функцию для отправки DELETE запроса.
 * @param PATCH создать функцию для отправки PATCH запроса.
 * @param PUT создать функцию для отправки PUT запроса.
 */
export const ServiceWrapper = {
    /* eslint-disable  @typescript-eslint/naming-convention */
    POST: <TResponse, TData = unknown>(
        requestProperty: IRequestPropertyWithData<TResponse, TData>
    ): (() => Promise<TResponse>) => (): Promise<TResponse> =>
        POST(transformRequestPropertyForRestActive(requestProperty)),
    GET: <TResponse>(requestProperty: IRequestProperty<TResponse>) => (): Promise<TResponse> =>
        GET(transformRequestPropertyForRestActive(requestProperty)),
    DELETE: <TResponse, TData = unknown>(
        requestProperty: IRequestPropertyWithData<TResponse, TData> | IRequestProperty<TResponse>
    ): (() => Promise<TResponse>) => (): Promise<TResponse> =>
        DELETE(transformRequestPropertyForRestActive(requestProperty)),
    PATCH: <TResponse, TData = unknown>(
        requestProperty: IRequestPropertyWithData<TResponse, TData>
    ): (() => Promise<TResponse>) => (): Promise<TResponse> =>
        PATCH(transformRequestPropertyForRestActive(requestProperty)),
    PUT: <TResponse, TData = unknown>(
        requestProperty: IRequestPropertyWithData<TResponse, TData>
    ): (() => Promise<TResponse>) => (): Promise<TResponse> =>
        PUT(transformRequestPropertyForRestActive(requestProperty)),
    /* eslint-enable @typescript-eslint/naming-convention */
};
