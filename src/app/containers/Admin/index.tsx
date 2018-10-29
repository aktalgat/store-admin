import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { AdminForm } from 'app/components';
import { CategoryModel } from "app/models";
import { connect } from "react-redux";
import { RootState } from "app/reducers";
import {bindActionCreators, Dispatch} from "redux";
import {CategoriesActions} from "app/actions";

export namespace Admin {
  export interface Props extends RouteComponentProps<void> {
    categories: CategoryModel[],

    fetch: any
  }
}

@connect(
  (state: RootState): Pick<Admin.Props, 'categories'> => {
    return {
      categories: state.categories.categories
    }
  },
  (dispatch: Dispatch): Pick<Admin.Props, 'fetch'> => ({
    fetch: bindActionCreators(CategoriesActions.fetchCategories, dispatch)
  })
)
export class Admin extends React.Component<Admin.Props> {
  componentDidMount() {
    this.props.fetch();
  }

  isAuth(): boolean {
    let token = sessionStorage.getItem('token') || '';
    return token != null && token !== '';
  }

  render() {
    if (this.isAuth()) {
      return <AdminForm />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}
