import * as React from 'react';
import { CategoryForm, ProductForm } from 'app/components';
import { CategoryModel } from 'app/models';

export namespace AdminForm {
  export interface Props {
    categories: CategoryModel[];

    addCategory: any;
  }

  export interface State {
    current: string;
  }
}

export class AdminForm extends React.Component<AdminForm.Props, AdminForm.State> {
  constructor(props: AdminForm.Props) {
    super(props);
    this.state = {
      current: 'category'
    };
  }

  handleClick = (current: string) => {
    this.setState({ current: current });
  };

  render() {
    const { current } = this.state;
    const { categories } = this.props;
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
            <ProductForm />
          </div>
        </div>
      </div>
    );
  }
}
