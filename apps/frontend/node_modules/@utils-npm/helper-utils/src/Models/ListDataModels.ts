import {IFilterable, ISearch, ISortable, TPagination, TTypedObject} from './SubsidiaryDataModels';

/**
 * Объектные списки.
 *
 * @prop {[key: string]: TData} items Мап таблица элементов.
 */
export interface IItemsCollection<TData = unknown> {
    items: TTypedObject<TData>;
}

/**
 * Простые списки.
 *
 * @prop {TData} items Список элементов
 */
export interface IItemsList<TData> {
    items: TData[];
}

/**
 * Пагинируемые коллекции хранятся в этой структуре.
 *
 * @prop items Мап таблица элементов.
 * @prop {number[]} order Порядок элементов
 */
export interface IItemsArray<TData> {
    items: TData[];
}

/**
 * Тип описывающий вспомогательные данные для отображения контента.
 */
export type TTableContentHelperData<TData> = ISortable<TData> & IFilterable<TData> & ISearch;

/**
 * Хранение пагинируемой коллекции
 *
 * @prop {IPagination} pagination Параметры пейджинга.
 */
export type TPaginatedItemsCollection<TData> = IItemsCollection<TData> &
    TPagination &
    ISortable<TData> &
    IFilterable<TData>;

/**
 * Списочные пагинируемые REST-сервисы возвращают результаты в этом формате.
 */
export type TPaginatedItems<TData> = IItemsList<TData> & TPagination & TTableContentHelperData<TData>;

/**
 * Списочные, не пагинируемые REST-сервисы возвращают результаты в этом формате.
 */
export type TSortedFilteredItems<TData> = IItemsList<TData> & TTableContentHelperData<TData>;
