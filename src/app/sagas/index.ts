/* eslint-disable no-constant-condition */

import { fork } from 'redux-saga/effects';

import loginSaga from './login';

export default function* root() {
  yield fork(loginSaga);
}
