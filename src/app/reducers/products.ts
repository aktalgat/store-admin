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
      return { ...state, isFetching: true, error: '' };
    },
    [ProductsActions.Type.RECEIVE_PRODUCTS]: (state, action) => {
      return { ...state, products: action.payload, isFetching: false };
    },
    [ProductsActions.Type.RECEIVE_FAIL_PRODUCTS]: (state, action) => {
      return { ...state, isFetching: false, error: action.payload };
    },

    [ProductsActions.Type.ADD_PRODUCT]: (state, action) => {
      return { ...state, error: '' };
    },
    [ProductsActions.Type.ADD_PRODUCT_FAIL]: (state, action) => {
      return { ...state, error: action.payload };
    },

    [ProductsActions.Type.UPDATE_PRODUCT]: (state, action) => {
      return { ...state, error: '' };
    },
    [ProductsActions.Type.UPDATE_PRODUCT_FAIL]: (state, action) => {
      return { ...state, error: action.payload };
    },

    [ProductsActions.Type.DELETE_PRODUCT]: (state, action) => {
      return { ...state, error: '' };
    },
    [ProductsActions.Type.DELETE_PRODUCT_FAIL]: (state, action) => {
      return { ...state, error: action.payload };
    }
  },
  initialState
);
