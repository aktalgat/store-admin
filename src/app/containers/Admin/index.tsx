import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { AdminForm } from 'app/components';
import { CategoryModel, UserModel } from 'app/models';
import { connect } from 'react-redux';
import { RootState } from 'app/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { CategoriesActions, LoginActions } from 'app/actions';

export namespace Admin {
  export interface State {
    isExpired: boolean;
  }

  export interface Props extends RouteComponentProps<void> {
    categories: CategoryModel[];
    user: UserModel;

    fetchCategories: any;
    addCategory: any;
    checkToken: any;
  }
}

@connect(
  (state: RootState): Pick<Admin.Props, 'categories' | 'user'> => {
    return {
      categories: state.categories.categories,
      user: state.user
    };
  },
  (dispatch: Dispatch): Pick<Admin.Props, 'fetchCategories' | 'addCategory' | 'checkToken'> => ({
    fetchCategories: bindActionCreators(CategoriesActions.fetchCategories, dispatch),
    addCategory: bindActionCreators(CategoriesActions.addCategory, dispatch),
    checkToken: bindActionCreators(LoginActions.checkToken, dispatch)
  })
)
export class Admin extends React.Component<Admin.Props, Admin.State> {
  constructor(props: Admin.Props) {
    super(props);
    this.state = {
      isExpired: false
    };
  }

  componentWillMount() {
    this.props.checkToken();
  }

  componentWillReceiveProps(nextProps: Admin.Props) {
    console.log('next props: {}', nextProps);
    this.setState({ isExpired: nextProps.user.isExpired });
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    if (!this.state.isExpired) {
      return <AdminForm categories={this.props.categories} addCategory={this.props.addCategory} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}
