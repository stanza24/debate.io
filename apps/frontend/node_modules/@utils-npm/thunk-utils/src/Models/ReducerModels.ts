import type {IAsyncData, IErrorsResult} from '@utils-npm/async-utils/src';
import type {Action} from 'redux-actions';
import type {ThunkDispatch} from 'redux-thunk';
import type {TAsyncAction} from './ActionDataModels';

/**
 * Модель диспатча из Thunk, с Action из redux-actions, но без обязательного payload
 *
 * @description данная типизация нужна только для того чтобы не дублировать этот код в местах создания модульных Actions.
 *
 * @example
 * // Пример использования getState в экшене.
 * anyActions = (id: string): Promise<any> =>
 *     this.dispatch((_, getState: () => IAppState) => {
 *         const {id, ...dataFromStoreWithOutId}: IAny = getState().collections.anyCollection[id];
 *
 *         return dispatchAsyncResponseBound<IAny>(
 *             this.dispatch,
 *             ActionNames.ANY_ACTIONS,
 *             ServiceWrapper.GET(
 *                 source: {url: MODULE_REST_URL, mock: `${MOCK_URL}/Any/Mock/file.json`},
 *                 params: {actionId}, // rest params
 *                 serviceMockDelay: true, // simulate rest delay;
 *            );
 *     })
 */
export type TThunkDispatch<TAppState = unknown> = ThunkDispatch<
    TAppState,
    unknown,
    Omit<Action<unknown>, 'payload'> & Partial<Pick<Action<unknown>, 'payload'>>
>;

/**
 * Интерфейс стандартной функции предобработки асинхронных даннных.
 */
export interface IStandardAsyncReducer<TStateData, TServiceData = TStateData, TPayload = undefined> {
    (state: IAsyncData<TStateData>, action: TAsyncAction<TServiceData, TPayload>): TStateData;
}

/**
 * Интерфейс кастомной функции предобработки асинхронных даннных.
 */
export interface ICustomAsyncReducer<TStateData, TServiceData = TStateData, TPayload = undefined> {
    (
        state: IAsyncData<TStateData>,
        action: Action<TPayload> | TAsyncAction<TServiceData | IErrorsResult, TPayload>
    ): IAsyncData<TStateData>;
}

/**
 * Набор кастомных предобработчиков для асинхронных редюсеров.
 * Необходимо на случай если требуется логика обработки данных на стороне клиента.
 *
 * Имеется ввиду вне цикла EActionTypeSuffixes.BEGIN -> EActionTypeSuffixes.SUCCESS || EActionTypeSuffixes.FAILURE.
 *
 * @prop {ICustomAsyncReducer<TAsyncData, TPayload>} [type: string].
 */
export interface ICustomAsyncReducersMap<TStateData, TServiceData = TStateData, TPayload = undefined> {
    [type: string]: ICustomAsyncReducer<TStateData, TServiceData, TPayload>;
}

/**
 * Предобработчики данных для асинхронных редюсеров в цепочке:
 * EActionTypeSuffixes.BEGIN -> EActionTypeSuffixes.SUCCESS || EActionTypeSuffixes.FAILURE.
 *
 * @prop begin Предобработчик при EActionTypeSuffixes.BEGIN.
 * @prop success Предобработчик при EActionTypeSuffixes.SUCCESS.
 * @prop failure Предобработчик при EActionTypeSuffixes.FAILURE.
 * @prop custom Кастомынй набор предобработчиков, для кейсов обработки данных вне базового цикло.
 */
export interface IReducerGroupPrepare<TStateData, TServiceData = TStateData, TPayload = undefined> {
    begin?: IStandardAsyncReducer<TStateData, never, TPayload>;
    success?: IStandardAsyncReducer<TStateData, TServiceData, TPayload>;
    failure?: IStandardAsyncReducer<TStateData, IErrorsResult, TPayload>;
    custom?: ICustomAsyncReducersMap<TStateData, TServiceData, TPayload>;
}
