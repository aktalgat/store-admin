import {RootState} from "app/reducers/state";
import {handleActions} from "redux-actions";
import {CategoriesActions} from "app/actions";

const initialState: RootState.CategoriesState = {
  categories: [],
  isFetching: false,
  error: ''
};

export const categoriesReducer = handleActions<RootState.CategoriesState, any>(
  {
    [CategoriesActions.Type.REQUEST_CATEGORIES]: (state, action) => {
      return {...state, isFetching: true}
    },
    [CategoriesActions.Type.RECEIVE_CATEGORIES]: (state, action) => {
      return {...state, isFetching: false}
    },
    [CategoriesActions.Type.RECEIVE_FAIL_CATEGORIES]: (state, action) => {
      return {...state, isFetching: false}
    }
  },
  initialState
);
