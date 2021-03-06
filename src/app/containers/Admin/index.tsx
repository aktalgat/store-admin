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

    checkToken: any;

    fetchCategories: any;
    addCategory: any;
    updateCategory: any;
    deleteCategory: any;

    fetchProducts: any;
    addProduct: any;
    updateProduct: any;
    deleteProduct: any;

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
    'addProduct' | 'updateProduct' | 'deleteProduct' | 'updateCategory' | 'deleteCategory'> => ({
    fetchCategories: bindActionCreators(CategoriesActions.fetchCategories, dispatch),
    addCategory: bindActionCreators(CategoriesActions.addCategory, dispatch),
    updateCategory: bindActionCreators(CategoriesActions.updateCategory, dispatch),
    deleteCategory: bindActionCreators(CategoriesActions.deleteCategory, dispatch),
    checkToken: bindActionCreators(LoginActions.checkToken, dispatch),
    fetchProducts: bindActionCreators(ProductsActions.fetchProducts, dispatch),
    addProduct: bindActionCreators(ProductsActions.addProduct, dispatch),
    updateProduct: bindActionCreators(ProductsActions.updateProduct, dispatch),
    deleteProduct: bindActionCreators(ProductsActions.deleteProduct, dispatch)
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
    const { categories, products, addCategory, fetchProducts, addProduct, error, updateProduct,
      deleteProduct, updateCategory, deleteCategory } = this.props;
    if (!this.props.user.isExpired) {
      return (
        <AdminForm categories={categories} addCategory={addCategory} products={products} fetchProducts={fetchProducts}
                   addProduct={addProduct} error={error} updateProduct={updateProduct} deleteProduct={deleteProduct}
                   updateCategory={updateCategory} deleteCategory={deleteCategory} />
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}
