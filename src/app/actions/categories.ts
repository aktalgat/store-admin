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
    ADD_CATEGORY_FAIL = 'ADD_CATEGORY_FAIL',

    UPDATE_CATEGORY = 'UPDATE_CATEGORY',
    UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST',
    UPDATE_CATEGORY_DONE = 'UPDATE_CATEGORY_DONE',
    UPDATE_CATEGORY_FAIL = 'UPDATE_CATEGORY_FAIL',

    DELETE_CATEGORY = 'DELETE_CATEGORY',
    DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST',
    DELETE_CATEGORY_DONE = 'DELETE_CATEGORY_DONE',
    DELETE_CATEGORY_FAIL = 'DELETE_CATEGORY_FAIL'
  }

  export const fetchCategories = createAction(Type.FETCH_CATEGORIES, (data: any) => data);
  export const requestCategories = createAction(Type.REQUEST_CATEGORIES);
  export const receiveCategories = createAction(Type.RECEIVE_CATEGORIES, (payments: any) => payments);
  export const receiveCategoriesFail = createAction(
    Type.RECEIVE_FAIL_CATEGORIES,
    (error: any) => 'Fetch categories. ' + error + '. '
  );

  export const addCategory = createAction(Type.ADD_CATEGORY, (data: any) => data);
  export const addCategoryRequest = createAction(Type.ADD_CATEGORY_REQUEST, (params: any) => params);
  export const addCategoryDone = createAction(Type.ADD_CATEGORY_DONE, (data: any) => data);
  export const addCategoryFail = createAction(
    Type.ADD_CATEGORY_FAIL,
    (error: any) => 'Add category. ' + error + '. '
  );

  export const updateCategory = createAction(Type.UPDATE_CATEGORY, (data: any) => data);
  export const updateCategoryRequest = createAction(Type.UPDATE_CATEGORY_REQUEST, (params: any) => params);
  export const updateCategoryDone = createAction(Type.UPDATE_CATEGORY_DONE, (data: any) => data);
  export const updateCategoryFail = createAction(
    Type.UPDATE_CATEGORY_FAIL,
    (error: any) => 'Update category. ' + error + '. '
  );

  export const deleteCategory = createAction(Type.DELETE_CATEGORY, (data: any) => data);
  export const deleteCategoryRequest = createAction(Type.DELETE_CATEGORY_REQUEST, (params: any) => params);
  export const deleteCategoryDone = createAction(Type.DELETE_CATEGORY_DONE, (data: any) => data);
  export const deleteCategoryFail = createAction(Type.DELETE_CATEGORY_FAIL,
    (error: any) => 'Delete category. ' + error + '. '
  );
}
