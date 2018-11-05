import { combineReducers } from 'redux';
import { RootState } from './state';
import { routerReducer, RouterState } from 'react-router-redux';
import { intlReducer } from 'react-intl-redux';
import { localesReducer } from './locales';
import { loginReducer } from './login';
import { categoriesReducer } from './categories';
import { productsReducer } from './products';

export { RootState, RouterState };

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  router: routerReducer as any,
  intl: intlReducer,
  locales: localesReducer,
  user: loginReducer as any,
  categories: categoriesReducer as any,
  products: productsReducer as any
});
