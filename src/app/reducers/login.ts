import { RootState } from 'app/reducers/state';
import { handleActions } from 'redux-actions';
import { LoginActions } from 'app/actions';

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
    [LoginActions.Type.LOGIN_FAIL]: (state, action) => {
      console.log('action: {}', action.payload);
      return { ...state, error: action.payload };
    }
  },
  initialState
);
