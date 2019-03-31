import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { logger } from 'app/middleware';
import { RootState} from 'app/reducers';
import { History } from 'history';

import createSagaMiddleware from 'redux-saga';
import createRootReducer from 'app/reducers';
import rootSaga from 'app/sagas';

export function configureStore(history: History, initialState?: RootState): Store<RootState> {
  const sagaMiddleware = createSagaMiddleware();

  let middleware = applyMiddleware(logger, routerMiddleware(history), sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(createRootReducer(history), initialState as any, middleware) as Store<RootState>;

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
