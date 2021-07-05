/* eslint-disable import/no-extraneous-dependencies */
import {createLogger} from 'redux-logger';
/* eslint-disable @typescript-eslint/no-var-requires, global-require, import/no-extraneous-dependencies */
const invariant = require('redux-immutable-state-invariant').default();
/* eslint-enable @typescript-eslint/no-var-requires,global-require */

const devTools = process.env.NODE_ENV === 'development' ? [invariant, createLogger({collapsed: true})] : [];

export {devTools};
