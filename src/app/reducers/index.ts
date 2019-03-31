import { combineReducers } from 'redux';
import { History } from 'history';
import { RootState } from './state';
import { RouterState, connectRouter } from 'connected-react-router';
import { intlReducer } from 'react-intl-redux';
import { localesReducer } from './locales';
import { loginReducer } from './login';
import { categoriesReducer } from './categories';
import { productsReducer } from './products';

export { RootState, RouterState };

const rootReducer = (history: History) => combineReducers<RootState>({
  router: connectRouter(history),
  intl: intlReducer,
  locales: localesReducer,
  user: loginReducer as any,
  categories: categoriesReducer as any,
  products: productsReducer as any
});

export default rootReducer;
