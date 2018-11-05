import { RootState } from 'app/reducers/state';
import { handleActions } from 'redux-actions';
import { ProductsActions } from 'app/actions';

const initialState: RootState.ProductsState = {
  products: [],
  isFetching: false,
  error: ''
};

export const productsReducer = handleActions<RootState.ProductsState, any>(
  {
    [ProductsActions.Type.REQUEST_PRODUCTS]: (state, action) => {
      return { ...state, isFetching: true };
    },
    [ProductsActions.Type.RECEIVE_PRODUCTS]: (state, action) => {
      return { ...state, products: action.payload, isFetching: false };
    },
    [ProductsActions.Type.RECEIVE_FAIL_PRODUCTS]: (state, action) => {
      return { ...state, isFetching: false};
    }
  },
  initialState
);
