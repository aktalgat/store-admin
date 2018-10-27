import {createAction} from "redux-actions";

export namespace CategoriesActions {
  export enum Type {
    FETCH_CATEGORIES = 'FETCH_CATEGORIES',
    REQUEST_CATEGORIES = 'REQUEST_CATEGORIES',
    RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES',
    RECEIVE_FAIL_CATEGORIES = 'RECEIVE_FAIL_CATEGORIES'
  }

  export const fetchCategories = createAction(Type.FETCH_CATEGORIES, (data: any) => data);
  export const requestCategories = createAction(Type.REQUEST_CATEGORIES);
  export const receiveCategories = createAction(Type.RECEIVE_CATEGORIES, (payments: any) => payments);
  export const receiveCategoriesFail = createAction(Type.RECEIVE_FAIL_CATEGORIES, (error: any) => error);
}
