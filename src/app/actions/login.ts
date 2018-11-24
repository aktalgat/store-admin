import { createAction } from 'redux-actions';

export namespace LoginActions {
  export enum Type {
    LOGIN = 'LOGIN',
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_DONE = 'LOGIN_DONE',
    LOGIN_FAIL = 'LOGIN_FAIL',

    LOGOUT = 'LOGOUT',

    CHECK_TOKEN = 'CHECK_TOKEN',
    CHECK_TOKEN_REQUEST = 'CHECK_TOKEN_REQUEST',
    CHECK_TOKEN_DONE = 'CHECK_TOKEN_DONE',
    CHECK_TOKEN_FAIL = 'CHECK_TOKEN_FAIL'
  }

  export const login = createAction(Type.LOGIN, (params: any) => params);
  export const loginRequest = createAction(Type.LOGIN_REQUEST, (params: any) => params);
  export const loginDone = createAction(Type.LOGIN_DONE, (response: any, params: any) => ({
    response,
    params
  }));
  export const loginFail = createAction(Type.LOGIN_FAIL, (error: any) => error);

  export const logout = createAction(Type.LOGOUT);

  export const checkToken = createAction(Type.CHECK_TOKEN, (params: any) => params);
  export const checkTokenRequest = createAction(Type.CHECK_TOKEN_REQUEST, (params: any) => params);
  export const checkTokenDone = createAction(Type.CHECK_TOKEN_DONE, (params: any) => params);
  export const checkTokenFail = createAction(Type.CHECK_TOKEN_FAIL, (params: any) => params);
}
