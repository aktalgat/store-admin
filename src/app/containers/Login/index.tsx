import * as React from 'react';
import { connect } from 'react-redux';
import {Redirect, RouteComponentProps} from 'react-router';
import { LoginForm } from 'app/components';
import { RootState } from 'app/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { LoginActions } from 'app/actions';
import {UserModel} from "app/models";

export namespace Login {
  export interface Props extends RouteComponentProps<void> {
    messages: any;
    error: string;
    auth: any;
    user: UserModel;
    checkToken: any;
  }
}

@connect(
  (state: RootState): Pick<Login.Props, 'error' | 'messages' | 'user'> => {
    return {
      error: state.user.error,
      messages: state.intl.messages,
      user: state.user
    };
  },
  (dispatch: Dispatch): Pick<Login.Props, 'auth' | 'checkToken'> => ({
    auth: bindActionCreators(LoginActions.login, dispatch),
    checkToken: bindActionCreators(LoginActions.checkToken, dispatch)
  })
)
export class Login extends React.Component<Login.Props> {
  componentWillMount() {
    this.props.checkToken();
  }

  render() {
    const { auth } = this.props;
    const loginProps = this.props as LoginForm.Fields;

    if (this.props.user.isExpired) {
      return <LoginForm {...loginProps} onSubmit={auth} />;
    } else {
      return <Redirect to="/" />;
    }
  }
}
