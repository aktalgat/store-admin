import api from '../api/index';
import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LoginActions } from 'app/actions';
import * as jwt from 'jwt-decode';

export function* login(data: any) {
  yield put(LoginActions.loginRequest(data));
  try {
    const { response, error } = yield call(api.login.post, data.payload);
    if (response) {
      let token: any = jwt(response.accessToken);
      let isAdmin = api.login.isAdmin(token.roles);
      if (isAdmin) {
        yield put(LoginActions.loginDone(response, data.payload));
        yield put(push('/'));
      } else {
        yield put(LoginActions.loginFail('You are not admin'));
      }
    } else {
      yield put(LoginActions.loginFail(error));
    }
  } catch (e) {
    yield put(LoginActions.loginFail(e));
  }
}

export function* watchLogin() {
  yield takeEvery(LoginActions.Type.LOGIN, login);
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

export function* checkToken(data: any) {
  yield put(LoginActions.checkTokenRequest(data));
  try {
    let token = yield call(api.login.getToken);
    if (token && token != '') {
      let tokenObj: any = jwt(token);
      let isAdmin = api.login.isAdmin(tokenObj.roles);
      if (isAdmin) {
        yield put(LoginActions.checkTokenDone(token));
      } else {
        yield put(LoginActions.checkTokenFail('You are not admin'));
      }
    } else {
      yield put(LoginActions.checkTokenFail('No token'));
    }
  } catch (e) {
    yield put(LoginActions.checkTokenFail(e));
  }
}

export function* watchCheckToken() {
  yield takeEvery(LoginActions.Type.CHECK_TOKEN, checkToken);
}

export default function* root() {
  yield fork(watchLogin);
  yield fork(watchLoginDone);
  yield fork(watchLogout);
  yield fork(watchCheckToken);
}
