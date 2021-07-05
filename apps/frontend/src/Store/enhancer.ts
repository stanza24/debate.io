import {applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {devTools} from './middleware/dev-tools';

/* eslint-disable */
const devtools =
    typeof window !== 'undefined' &&
    //@ts-ignore
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({actionsBlacklist: []});
/* eslint-enable */
const composeEnhancers = devtools || compose;

const middleware = [...devTools, thunk];

const enhancer = composeEnhancers(applyMiddleware(...middleware));

export default enhancer;
