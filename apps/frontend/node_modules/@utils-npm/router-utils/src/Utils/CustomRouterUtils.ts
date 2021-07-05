import type {History, Location, LocationDescriptorObject} from 'history';
import {startsWith} from 'lodash';
import {generatePath} from 'react-router';
import {getParameterByName} from './LocationPathnameUtils';

/**
 * Интерфейс генерируемой утилиты над History приложения.
 *
 * @prop params Параметры для подстановки в Route.
 * @prop state Состояние которое требуется передать через Location.
 */
interface IRedirectParams extends Omit<LocationDescriptorObject, 'pathname'> {
    preserveParameterNames?: string[];
    params?: {[paramName: string]: string | number | boolean | undefined};
}

/**
 * Интерфейс генерируемой утилиты над History приложения.
 *
 * @prop redirect Перейти на другую страницу..
 * @prop location Получить текущий location
 * @prop reload ТПерезагрузка текущей страницы.
 * @prop isRouteActive Определяем активность текущего пути, или пути переданного вторым аргументом.
 */
export interface IHistoryUtils {
    redirect: (path: string, redirectParams?: IRedirectParams) => void;
    location: () => Location;
    reload: (isReloadPage: boolean) => void;
    isRouteActive: (route: string, pathname: string) => boolean;
}

/**
 * Интерфейс элемента мапы параметров запроса.
 *
 * @prop search Новая строка параметров запроса.
 * @prop preserveParameterNames Список имен параметров запроса, которые требуется сохранить при смене текущего роута.
 */
interface IPreserveFuncParam {
    search?: string;
    preserveParameterNames?: string[];
}

/**
 * Создаём объект кастомных утилит над History приложения.
 *
 * @param historyApp Экземпляр history приложения.
 */
export const createHistoryUtils = (historyApp: History): IHistoryUtils => {
    /**
     * Получить текущий location
     */
    const location = (): Location => historyApp.location;

    /**
     * Утилита для сохраняет query параметры в запросе, при смене роута, по списку preserveParameterNames из параметров вызова.
     *
     * @param params Параметры вызова функции.
     */
    const preserveQueryParameters = (params: IPreserveFuncParam): string | undefined => {
        const currentLocation: Location = location();
        // Если есть preserveParameterNames и search в location не пустой, пробуем сохранить parameter query
        if (
            params.preserveParameterNames &&
            params.preserveParameterNames.length > 0 &&
            currentLocation.search.length > 0
        ) {
            const preservedParameters: (string | undefined)[] = params.preserveParameterNames.map((name: string):
                | string
                | undefined => {
                const paramValue = getParameterByName({name, currentUrl: currentLocation.search});

                if (paramValue) {
                    return `${name}=${encodeURIComponent(paramValue)}`;
                }

                return undefined;
            });

            const allParameters = [params.search, ...preservedParameters].filter((queryString) => !!queryString);

            return allParameters.join('&');
        }

        return params.search;
    };

    /**
     * Перейти на другую страницу.
     *
     * @param path Новый url.
     * @param params Параметры пути.
     * @param state Состояние передающееся через редирект.
     */
    const redirect = (
        path: string,
        {params, preserveParameterNames, search, ...locationDescriptorObject}: IRedirectParams = {}
    ): void => {
        if (locationDescriptorObject) {
            historyApp.push({
                pathname: generatePath(path, params),
                search: preserveQueryParameters({preserveParameterNames, search}),
                ...locationDescriptorObject,
            });
        } else historyApp.push(generatePath(path, params));
    };

    /**
     * Перезагрузка текущей страницы.
     *
     * @param isReloadPage Определяем необходимость перезагрузки страницы.
     *
     * @description
     * Если isReloadPage is false - Меняем текущий роут на технический роут, а затем обратно.
     * Метод работает на принципе смены роута в react-router, размонтировании компонента, а затем его повторный маунт.
     *
     * * Если isReloadPage is true - Перезагружаем страницу в браузере.
     */
    const reload = (isReloadPage = true): void => {
        if (isReloadPage) {
            historyApp.go(0);
        } else {
            const currentLocation = location();
            historyApp.replace('/reload-page');
            setTimeout(() => {
                historyApp.replace(currentLocation);
            });
        }
    };

    /**
     * Определяем активность текущего пути, или пути переданного вторым аргументом.
     *
     * @param route Роут который нужно првоерить
     * @param pathname Текущий путь из react router.
     */
    const isRouteActive = (route: string, pathname: string = location().pathname): boolean =>
        startsWith(pathname, route);

    /**
     * Объект утилит роутера
     *
     * @description Подробности необходимости его использования описаны в src/Core/Utils/RouterUtils/History.ts
     */
    return {
        redirect,
        location,
        reload,
        isRouteActive,
    };
};
