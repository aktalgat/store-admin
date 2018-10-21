import api from '../api/index';
import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { LoginActions } from 'app/actions/index';

export function* login(data: any) {
  yield put(LoginActions.loginRequest(data));
  try {
    const { response, error } = yield call(api.login.post, data.payload);
    if (response) {
      yield put(LoginActions.loginDone(response));
      yield put(push('/admin'));
    } else {
      yield put(LoginActions.loginFail(error));
    }
  } catch (e) {
    yield put(LoginActions.loginFail(e));
  }
}

export function* logout() {
  yield call(api.login.remove);
  yield put(push('/login'));
}

export function* watchLogout() {
  yield takeEvery(LoginActions.Type.LOGOUT, logout);
}

export function* loginDone(data: any) {
  yield call(api.login.put, data.payload);
}

export function* watchLoginDone() {
  yield takeEvery(LoginActions.Type.LOGIN_DONE, loginDone);
}

export function* watchLogin() {
  yield takeEvery(LoginActions.Type.LOGIN, login);
}

export default function* root() {
  yield fork(watchLogin);
  yield fork(watchLoginDone);
  yield fork(watchLogout);
}
