import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { AdminForm } from 'app/components';
import {CategoryModel, UserModel} from "app/models";
import { connect } from "react-redux";
import { RootState } from "app/reducers";
import {bindActionCreators, Dispatch} from "redux";
import {CategoriesActions, LoginActions} from "app/actions";

export namespace Admin {
  export interface Props extends RouteComponentProps<void> {
    categories: CategoryModel[],
    user: UserModel,

    fetch: any,
    checkToken: any
  }
}

@connect(
  (state: RootState): Pick<Admin.Props, 'categories' | 'user'> => {
    return {
      categories: state.categories.categories,
      user: state.user
    }
  },
  (dispatch: Dispatch): Pick<Admin.Props, 'fetch' | 'checkToken'> => ({
    fetch: bindActionCreators(CategoriesActions.fetchCategories, dispatch),
    checkToken: bindActionCreators(LoginActions.checkToken, dispatch)
  })
)
export class Admin extends React.Component<Admin.Props> {
  componentWillMount() {
    this.props.checkToken();
  }

  componentDidMount() {
    this.props.fetch();
  }

  isAuth(): boolean {
    let token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
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
