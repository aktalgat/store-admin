import { call, fork, put, takeEvery } from 'redux-saga/effects';
import api from 'app/api';
import { ProductsActions } from 'app/actions';

export function* fetchProducts(data: any) {
  yield put(ProductsActions.requestProducts());
  try {
    const { response, error } = yield call(api.products.get, data.payload);
    if (response) {
      yield put(ProductsActions.receiveProducts(response));
    } else {
      yield put(ProductsActions.receiveProductsFail(error));
    }
  } catch (e) {
    yield put(ProductsActions.receiveProductsFail(e));
  }
}

export function* watchProducts() {
  yield takeEvery(ProductsActions.Type.FETCH_PRODUCTS, fetchProducts);
}

export function* postProduct(data: any) {
  yield put(ProductsActions.addProductRequest(data));
  try {
    const { response, error } = yield call(api.products.post, data.payload);
    if (response) {
      yield put(ProductsActions.addProductDone(response));
    } else {
      yield put(ProductsActions.addProductFail(error));
    }
  } catch (e) {
    yield put(ProductsActions.addProductFail(e));
  }
}

export function* watchPostProduct() {
  yield takeEvery(ProductsActions.Type.ADD_PRODUCT, postProduct);
}

export function* postProductDone(data: any) {
  yield put(ProductsActions.fetchProducts(data.payload));
}

export function* watchPostProductDone() {
  yield takeEvery(ProductsActions.Type.ADD_PRODUCT_DONE, postProductDone);
}

export function* putProduct(data: any) {
  yield put(ProductsActions.updateProductRequest(data));
  try {
    const { response, error } = yield call(api.products.put, data.payload);
    if (response) {
      yield put(ProductsActions.updateProductDone(response));
    } else {
      yield put(ProductsActions.updateProductFail(error));
    }
  } catch (e) {
    yield put(ProductsActions.updateProductFail(e));
  }
}

export function* watchPutProduct() {
  yield takeEvery(ProductsActions.Type.UPDATE_PRODUCT, putProduct);
}

export function* putProductDone(data: any) {
  yield put(ProductsActions.fetchProducts(data.payload));
}

export function* watchPutProductDone() {
  yield takeEvery(ProductsActions.Type.UPDATE_PRODUCT_DONE, putProductDone);
}

export default function* root() {
  yield fork(watchProducts);
  yield fork(watchPostProduct);
  yield fork(watchPostProductDone);
  yield fork(watchPutProduct);
  yield fork(watchPutProductDone);
}
