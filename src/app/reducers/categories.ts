import { RootState } from 'app/reducers/state';
import { handleActions } from 'redux-actions';
import { CategoriesActions } from 'app/actions';

const initialState: RootState.CategoriesState = {
  categories: [],
  isFetching: false,
  error: ''
};

export const categoriesReducer = handleActions<RootState.CategoriesState, any>(
  {
    [CategoriesActions.Type.REQUEST_CATEGORIES]: (state, action) => {
      return { ...state, isFetching: true, error: '' };
    },
    [CategoriesActions.Type.RECEIVE_CATEGORIES]: (state, action) => {
      return { ...state, categories: action.payload, isFetching: false };
    },
    [CategoriesActions.Type.RECEIVE_FAIL_CATEGORIES]: (state, action) => {
      return { ...state, isFetching: false, error: action.payload };
    },

    [CategoriesActions.Type.ADD_CATEGORY]: (state, action) => {
      return { ...state, error: '' };
    },
    [CategoriesActions.Type.ADD_CATEGORY_FAIL]: (state, action) => {
      return { ...state, error: action.payload };
    }
  },
  initialState
);
