/* eslint-disable no-constant-condition */

import { fork } from 'redux-saga/effects';

import loginSaga from './login';
import categoriesSaga from './categories';
import productsSaga from './products';

export default function* root() {
  yield fork(loginSaga);
  yield fork(categoriesSaga);
  yield fork(productsSaga);
}
