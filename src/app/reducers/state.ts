import { RouterState } from 'connected-react-router';
import { CategoriesModel, UserModel, ProductsModel } from 'app/models';

export interface RootState {
  router: RouterState;
  intl: any;
  locales: RootState.LocaleState;
  user: RootState.UserState;
  categories: RootState.CategoriesState;
  products: RootState.ProductsState;
}

export namespace RootState {
  export type LocaleState = any;
  export type UserState = UserModel;
  export type CategoriesState = CategoriesModel;
  export type ProductsState = ProductsModel;
}
