import {applyMiddleware, compose, createStore, Store} from 'redux';
import createSagaMiddleware, {Task} from 'redux-saga';
import {all} from 'redux-saga/effects';

type TStore = Store & {
  sagaTask?: Task;
  runSagaTask?: () => void;
};

export default (initialState = {}) => {
  // Middleware
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  // Redux devtools
  let composeEnhancers = compose;

  // Redux store

  // @ts-ignore
  const store: TStore = createStore((state, action) => {
      },
      initialState,

      composeEnhancers(applyMiddleware(...middleware))
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };
  store.runSagaTask();


  return store;
};

function* rootSaga() {
  yield all([])
}
