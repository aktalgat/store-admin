import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { AdminForm } from 'app/components';
import { CategoryModel, ProductModel, UserModel } from 'app/models';
import { connect } from 'react-redux';
import { RootState } from 'app/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { CategoriesActions, LoginActions, ProductsActions } from 'app/actions';

export namespace Admin {
  export interface Props extends RouteComponentProps<void> {
    categories: CategoryModel[];
    user: UserModel;
    products: ProductModel[];

    fetchCategories: any;
    addCategory: any;
    checkToken: any;
    fetchProducts: any;
    addProduct: any;
    editProduct: any;
    error: string;
  }
}

@connect(
  (state: RootState): Pick<Admin.Props, 'categories' | 'user' | 'products' | 'error'> => {
    return {
      categories: state.categories.categories,
      user: state.user,
      products: state.products.products,
      error: state.categories.error + state.products.error
    };
  },
  (dispatch: Dispatch): Pick<Admin.Props, 'fetchCategories' | 'addCategory' | 'checkToken' | 'fetchProducts' |
    'addProduct' | 'editProduct'> => ({
    fetchCategories: bindActionCreators(CategoriesActions.fetchCategories, dispatch),
    addCategory: bindActionCreators(CategoriesActions.addCategory, dispatch),
    checkToken: bindActionCreators(LoginActions.checkToken, dispatch),
    fetchProducts: bindActionCreators(ProductsActions.fetchProducts, dispatch),
    addProduct: bindActionCreators(ProductsActions.addProduct, dispatch),
    editProduct: bindActionCreators(ProductsActions.editProduct, dispatch)
  })
)
export class Admin extends React.Component<Admin.Props> {
  componentWillMount() {
    this.props.checkToken();
    if (!this.props.user.isExpired) {
      this.props.fetchCategories();
    }
  }

  render() {
    const { categories, products, addCategory, fetchProducts, addProduct, error } = this.props;
    if (!this.props.user.isExpired) {
      return (
        <AdminForm categories={categories} addCategory={addCategory} products={products} fetchProducts={fetchProducts}
                   addProduct={addProduct} error={error}/>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}
