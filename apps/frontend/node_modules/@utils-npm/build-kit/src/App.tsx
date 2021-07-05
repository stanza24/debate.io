import {FunctionComponent} from 'react';
import {hot} from 'react-hot-loader/root';

/**
 * Версия билда проекта
 */
// @ts-expect-error Cannot find name 'VERSION'.ts(2304)
export const SBER_NPM_BUILD_KIT_PACKAGE_VERSION = `v.1.${VERSION}`;
// eslint-disable-next-line no-console
console.log(`SBER_NPM_BUILD_KIT_PACKAGE_VERSION-${SBER_NPM_BUILD_KIT_PACKAGE_VERSION}`);

export const App: FunctionComponent = hot(() => <div>Привет</div>);
