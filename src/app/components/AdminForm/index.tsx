import * as React from 'react';
import {CategoryForm, ProductForm} from "app/components";

export namespace AdminForm {
  export interface Props {

  }

  export interface State {

  }
}

export class AdminForm extends React.Component<AdminForm.Props, AdminForm.State> {

  render() {
    return (
      <div id="wrapper" className="d-flex">
        <ul className="sidebar navbar-nav">
          <li className="nav-item"><span className="nav-span-item">Категории</span></li>
          <li className="nav-item"><span className="nav-span-item">Товары</span></li>
        </ul>
        <div id="content-wrapper">
          <CategoryForm/>
          <ProductForm/>
        </div>
      </div>
    );
  }
}
