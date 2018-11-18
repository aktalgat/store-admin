import { createAction } from 'redux-actions';

export namespace CategoriesActions {
  export enum Type {
    FETCH_CATEGORIES = 'FETCH_CATEGORIES',
    REQUEST_CATEGORIES = 'REQUEST_CATEGORIES',
    RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES',
    RECEIVE_FAIL_CATEGORIES = 'RECEIVE_FAIL_CATEGORIES',

    ADD_CATEGORY = 'ADD_CATEGORY',
    ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST',
    ADD_CATEGORY_DONE = 'ADD_CATEGORY_DONE',
    ADD_CATEGORY_FAIL = 'ADD_CATEGORY_FAIL'
  }

  export const fetchCategories = createAction(Type.FETCH_CATEGORIES, (data: any) => data);
  export const requestCategories = createAction(Type.REQUEST_CATEGORIES);
  export const receiveCategories = createAction(Type.RECEIVE_CATEGORIES, (payments: any) => payments);
  export const receiveCategoriesFail = createAction(Type.RECEIVE_FAIL_CATEGORIES, (error: any) => 'Fetch categories. ' + error + '. ');

  export const addCategory = createAction(Type.ADD_CATEGORY, (data: any) => data);
  export const addCategoryRequest = createAction(Type.ADD_CATEGORY_REQUEST, (params: any) => params);
  export const addCategoryDone = createAction(Type.ADD_CATEGORY_DONE, (data: any) => data);
  export const addCategoryFail = createAction(Type.ADD_CATEGORY_FAIL, (error: any) => 'Add category. ' + error  + '. ');
}
