import { RouterState } from 'react-router-redux';
import { CategoriesModel, UserModel } from 'app/models';

export interface RootState {
  router: RouterState;
  intl: any;
  locales: RootState.LocaleState;
  user: RootState.UserState;
  categories: RootState.CategoriesState;
}

export namespace RootState {
  export type LocaleState = any;
  export type UserState = UserModel;
  export type CategoriesState = CategoriesModel;
}
