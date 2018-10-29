import { RootState } from 'app/reducers/state';
import { handleActions } from 'redux-actions';
import { LoginActions } from 'app/actions';
import * as jwt from 'jwt-decode';

const initialState: RootState.UserState = {
  userName: '',
  email: '',
  login: '',
  error: ''
};

export const loginReducer = handleActions<RootState.UserState, any>(
  {
    [LoginActions.Type.LOGIN]: (state, action) => {
      return { ...state, error: '' };
    },
    [LoginActions.Type.LOGIN_DONE]: (state, action) => {
      console.log('login done: {}', action);
      let token: any = jwt(action.payload.response.accessToken);
      let newState = {
        userName: token.userName,
        email: token.userEmail
      };
      console.log('token: {}', token);
      return { ...state, newState}
    },
    [LoginActions.Type.LOGIN_FAIL]: (state, action) => {
      console.log('action: {}', action.payload);
      return { ...state, error: action.payload };
    }
  },
  initialState
);
