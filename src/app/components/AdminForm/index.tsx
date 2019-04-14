import * as React from 'react';
import { CategoryForm, ProductForm } from 'app/components';
import { CategoryModel, ProductModel } from 'app/models';
import { FormattedMessage } from 'react-intl';

export namespace AdminForm {
  export interface Props {
    categories: CategoryModel[];
    products: ProductModel[];

    addCategory: any;
    fetchProducts: any;
    addProduct: any;
    updateProduct: any;
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
      this.setState({ error: nextProps.error, showError: true });
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
    this.setState({ showError: false });
  };

  render() {
    const { current, showError, error } = this.state;
    const { categories, products } = this.props;
    return (
      <div id="wrapper" className="d-flex">
        <div className="row main-row">
          <div className="col-3">
            <div className="nav flex-column nav-pills sidebar">
              <span className={'nav-link nav-span-item' + (current == 'category' ? ' active' : '')} data-toggle="pill"
                    role="tab" aria-controls="v-pills-home" aria-selected="true"
                    onClick={() => this.handleClick('category')}>
                <FormattedMessage id="categories" defaultMessage="Categories" />
              </span>
              <span className={'nav-link nav-span-item' + (current == 'product' ? ' active' : '')} data-toggle="pill"
                    role="tab" aria-controls="v-pills-profile" aria-selected="false"
                    onClick={() => this.handleClick('product')}>
                <FormattedMessage id="products" defaultMessage="Products" />
              </span>
            </div>
          </div>
          <div className="col-9">
            <div className="tab-content content-wrapper">
              <div className={'tab-pane fade' + (current == 'category' ? ' show active' : '')} role="tabpanel"
                   aria-labelledby="v-pills-home-tab">
                <CategoryForm categories={categories} addCategory={this.props.addCategory} />
              </div>
              <div className={'tab-pane fade' + (current == 'product' ? ' show active' : '')} role="tabpanel"
                   aria-labelledby="v-pills-profile-tab">
                <ProductForm products={products} addProduct={this.props.addProduct} updateProduct={this.props.updateProduct}
                             categories={categories} />
              </div>
            </div>
          </div>
        </div>

        <div className={'myAlert-top alert alert-danger ' + (showError ? '' : 'd-none')}>
          <span className="close" data-dismiss="alert" aria-label="close" onClick={this.handleCloseClick}>&times;</span>
          <strong>Error!</strong> {error}
        </div>
      </div>
    );
  }
}
