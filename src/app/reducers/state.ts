import { RouterState } from 'react-router-redux';
import { UserModel } from 'app/models';

export interface RootState {
  router: RouterState;
  intl: any;
  locales: RootState.LocaleState;
  user: RootState.UserState;
}

export namespace RootState {
  export type LocaleState = any;
  export type UserState = UserModel;
}
