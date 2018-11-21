import { RootState } from 'app/reducers/state';
import { handleActions } from 'redux-actions';
import { LoginActions } from 'app/actions';
import api from '../api/index';

const initialState: RootState.UserState = {
  userName: '',
  email: '',
  login: '',
  error: '',
  isExpired: false
};

export const loginReducer = handleActions<RootState.UserState, any>(
  {
    [LoginActions.Type.LOGIN]: (state, action) => {
      return { ...state, error: '' };
    },
    [LoginActions.Type.LOGIN_DONE]: (state, action) => {
      const resp: any = api.login.decodeToken(action.payload.response.accessToken);
      return { ...state, ...resp.state };
    },
    [LoginActions.Type.LOGIN_FAIL]: (state, action) => {
      return { ...state, error: action.payload };
    },
    [LoginActions.Type.CHECK_TOKEN]: (state, action) => {
      return { ...state, error: '' };
    },
    [LoginActions.Type.CHECK_TOKEN_DONE]: (state, action) => {
      const resp: any = api.login.decodeToken(action.payload);
      return { ...state, ...resp.state };
    },
    [LoginActions.Type.CHECK_TOKEN_FAIL]: (state, action) => {
      return { ...state, error: action.payload, isExpired: true };
    }
  },
  initialState
);
