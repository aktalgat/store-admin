import {call, fork, put, takeEvery} from "redux-saga/effects";
import api from 'app/api';
import {CategoriesActions} from "app/actions";

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

export default function* root() {
  yield fork(watchCategories);
}
