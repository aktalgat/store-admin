import * as React from 'react';
import { CategoryForm, ProductForm } from 'app/components';
import { CategoryModel, ProductModel } from 'app/models';

export namespace AdminForm {
  export interface Props {
    categories: CategoryModel[];
    products: ProductModel[];

    addCategory: any;
    fetchProducts: any;
    addProduct: any;
    error: string;
  }

  export interface State {
    current: string;
    isProductsFetched: boolean;
    showError: boolean;
    error: string;
  }
}

export class AdminForm extends React.Component<AdminForm.Props, AdminForm.State> {
  constructor(props: AdminForm.Props) {
    super(props);
    this.state = {
      current: 'category',
      isProductsFetched: false,
      showError: false,
      error: ''
    };
  }

  componentWillReceiveProps(nextProps: AdminForm.Props) {
    if (nextProps.error != '' && this.state.error != nextProps.error) {
      this.setState({error: nextProps.error, showError: true});
    }
  }

  handleClick = (current: string) => {
    this.setState({ current: current });
    if (current == 'product' && !this.state.isProductsFetched) {
      this.props.fetchProducts();
      this.setState({ isProductsFetched: true });
    }
  };

  handleCloseClick = () => {
    this.setState({showError: false});
  };

  render() {
    const { current, showError, error } = this.state;
    const { categories, products } = this.props;
    return (
      <div id="wrapper" className="d-flex">
        <ul className="sidebar navbar-nav">
          <li className="nav-item">
            <span className="nav-span-item" onClick={() => this.handleClick('category')}>
              Категории
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-span-item" onClick={() => this.handleClick('product')}>
              Товары
            </span>
          </li>
        </ul>
        <div id="content-wrapper">
          <div className={current == 'category' ? '' : 'd-none'}>
            <CategoryForm categories={categories} addCategory={this.props.addCategory} />
          </div>
          <div className={current == 'product' ? '' : 'd-none'}>
            <ProductForm
              products={products}
              addProduct={this.props.addProduct}
              categories={categories}
            />
          </div>
        </div>

        <div className={"myAlert-top alert alert-danger " + (showError ? "" : "d-none")}>
          <a href="#" className="close" data-dismiss="alert" aria-label="close" onClick={this.handleCloseClick}>&times;</a>
          <strong>Error!</strong> {error}
        </div>
      </div>
    );
  }
}
