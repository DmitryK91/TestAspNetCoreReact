import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { requestStudents } from './actions/reducer';


export default function configureStore(initialState) {

    const rootReducer = combineReducers({
        requestStudents
    });

    const logger = createLogger();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware, logger))
    );

    return store;
}
