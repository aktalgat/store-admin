import { createAction } from 'redux-actions';

export namespace ProductsActions {
  export enum Type {
    FETCH_PRODUCTS = 'FETCH_PRODUCTS',
    REQUEST_PRODUCTS = 'REQUEST_PRODUCTS',
    RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS',
    RECEIVE_FAIL_PRODUCTS = 'RECEIVE_FAIL_PRODUCTS',

    ADD_PRODUCT = 'ADD_PRODUCT',
    ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST',
    ADD_PRODUCT_DONE = 'ADD_PRODUCT_DONE',
    ADD_PRODUCT_FAIL = 'ADD_PRODUCT_FAIL'
  }

  export const fetchProducts = createAction(Type.FETCH_PRODUCTS, (data: any) => data);
  export const requestProducts = createAction(Type.REQUEST_PRODUCTS);
  export const receiveProducts = createAction(Type.RECEIVE_PRODUCTS, (payments: any) => payments);
  export const receiveProductsFail = createAction(Type.RECEIVE_FAIL_PRODUCTS, (error: any) => 'Fetch products. ' + error);

  export const addProduct = createAction(Type.ADD_PRODUCT, (data: any) => data);
  export const addProductRequest = createAction(Type.ADD_PRODUCT_REQUEST, (params: any) => params);
  export const addProductDone = createAction(Type.ADD_PRODUCT_DONE, (data: any) => data);
  export const addProductFail = createAction(Type.ADD_PRODUCT_FAIL, (error: any) => 'Add product. ' + error);
}
