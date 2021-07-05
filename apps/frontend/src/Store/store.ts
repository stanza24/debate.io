import {createStore} from 'redux';
import enhancer from './enhancer';
import {rootReducer} from './reducers';

const store = createStore(
    rootReducer,
    enhancer
);

export {store};
