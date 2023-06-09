import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../saga';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
// Run the saga
sagaMiddleware.run(rootSaga);
export default store;