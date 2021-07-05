import {ESort} from '../Enums';

/**
 * Более строгая типизация обычного объекта, с возможностью ограничить ключи через Enum.
 */
export type TTypedObject<TData, TEnum extends string = string> = {[key in TEnum]?: TData};

/**
 * Общий формат пагинации.
 *
 * @prop count Количество элементов в конечном списке.
 * @prop page Номер страницы.
 * @prop itemsPerPage Количество элементов на одной странице.
 */
export interface IPagination {
    count: number;
    page: number;
    itemsPerPage: number;
}

/**
 * Пагинация списков
 *
 * @prop {IPagination} pagination Параметры пейджинга.
 */
export type TPagination = {
    pagination: IPagination;
};

/**
 * Пагинация списков отправляемая на сервер
 *
 * @prop {IPagination} pagination Параметры пейджинга.
 */
export type TSendingPagination = {
    pagination: Omit<IPagination, 'count'>;
};

/** Описание полей не участвующих в сортировке или фильтрации . */
type TNotSortedNotFilteredProp = 'order' | 'key' | 'id';

/** Тип описывающий поля участвующие в сортировках и фильтрации . */
export type TSortedFilteredProp<TData> = Omit<TData, TNotSortedNotFilteredProp>;

/**
 * Модель описания сортировки
 *
 * @prop field Поле по которому идёт сортировка.
 * @prop order Тип сортировки.
 */
export interface ISort<TData> {
    field: keyof TSortedFilteredProp<TData>;
    order: ESort;
}

/**
 * Тип объекта фильтрации
 *
 * @prop field Поле по которому идёт сортировка.
 * @prop order Тип сортировки.
 */
export type TFilter<TData> = TTypedObject<string[], keyof TSortedFilteredProp<TData>>;

/**
 * Описание сортируемого списка
 *
 * @prop [sort] Описание сортировки.
 */
export interface ISortable<TData> {
    sort?: ISort<TData>;
}

/**
 * Описание объекта поиска.
 *
 * @prop [search] Поисковая строка.
 */
export interface ISearch {
    search?: string;
}

/**
 * Описание сортируемого списка
 *
 * @prop [sort] Описание сортировки.
 */
export interface IFilterable<TData> {
    filter?: TFilter<TData>;
}
