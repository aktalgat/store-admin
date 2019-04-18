import { call, fork, put, takeEvery } from 'redux-saga/effects';
import api from 'app/api';
import { CategoriesActions } from 'app/actions';

export function* fetchCategories(data: any) {
  yield put(CategoriesActions.requestCategories());
  try {
    const { response, error } = yield call(api.categories.get, data.payload);
    if (response) {
      yield put(CategoriesActions.receiveCategories(response));
    } else {
      yield put(CategoriesActions.receiveCategoriesFail(error));
    }
  } catch (e) {
    yield put(CategoriesActions.receiveCategoriesFail(e));
  }
}

export function* watchCategories() {
  yield takeEvery(CategoriesActions.Type.FETCH_CATEGORIES, fetchCategories);
}

export function* postCategory(data: any) {
  yield put(CategoriesActions.addCategoryRequest(data));
  try {
    const { response, error } = yield call(api.categories.post, data.payload);
    if (response) {
      yield put(CategoriesActions.addCategoryDone(response));
    } else {
      yield put(CategoriesActions.addCategoryFail(error));
    }
  } catch (e) {
    yield put(CategoriesActions.addCategoryFail(e));
  }
}

export function* watchPostCategory() {
  yield takeEvery(CategoriesActions.Type.ADD_CATEGORY, postCategory);
}

export function* postCategoryDone(data: any) {
  yield put(CategoriesActions.fetchCategories(data.payload));
}

export function* watchPostCategoryDone() {
  yield takeEvery(CategoriesActions.Type.ADD_CATEGORY_DONE, postCategoryDone);
}

export function* putCategory(data: any) {
  yield put(CategoriesActions.updateCategoryRequest(data));
  try {
    const { response, error } = yield call(api.categories.put, data.payload);
    if (response) {
      yield put(CategoriesActions.updateCategoryDone(response));
    } else {
      yield put(CategoriesActions.updateCategoryFail(error));
    }
  } catch (e) {
    yield put(CategoriesActions.updateCategoryFail(e));
  }
}

export function* watchPutCategory() {
  yield takeEvery(CategoriesActions.Type.UPDATE_CATEGORY, putCategory);
}

export function* putCategoryDone(data: any) {
  yield put(CategoriesActions.fetchCategories(data.payload));
}

export function* watchPutCategoryDone() {
  yield takeEvery(CategoriesActions.Type.UPDATE_CATEGORY_DONE, putCategoryDone);
}

export default function* root() {
  yield fork(watchCategories);
  yield fork(watchPostCategory);
  yield fork(watchPostCategoryDone);
  yield fork(watchPutCategory);
  yield fork(watchPutCategoryDone);
}
