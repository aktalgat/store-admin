import {createAction} from "redux-actions";

export namespace LoginActions {
    export enum Type {
        LOGIN = 'LOGIN',
        LOGIN_REQUEST = 'LOGIN_REQUEST',
        LOGIN_DONE = 'LOGIN_DONE',
        LOGIN_FAIL = 'LOGIN_FAIL',

        LOGOUT = 'LOGOUT'
    }

    export const login = createAction(Type.LOGIN, (params: any) => params);
    export const loginRequest = createAction(Type.LOGIN_REQUEST, (params: any) => params);
    export const loginDone = createAction(Type.LOGIN_DONE, (params: any) => params);
    export const loginFail = createAction(Type.LOGIN_FAIL, (error: any) => error);

    export const logout = createAction(Type.LOGOUT);
}
