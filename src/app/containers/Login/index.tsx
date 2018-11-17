import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { LoginForm } from 'app/components';
import { RootState } from 'app/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { LoginActions } from 'app/actions';

export namespace Login {
  export interface Props extends RouteComponentProps<void> {
    messages: any;
    error: string;
    auth: any;
  }
}

@connect(
  (state: RootState): Pick<Login.Props, 'error' | 'messages'> => {
    return {
      error: state.user.error,
      messages: state.intl.messages
    };
  },
  (dispatch: Dispatch): Pick<Login.Props, 'auth'> => ({
    auth: bindActionCreators(LoginActions.login, dispatch)
  })
)
export class Login extends React.Component<Login.Props> {
  render() {
    const { auth } = this.props;
    const loginProps = this.props as LoginForm.Fields;

    return <LoginForm {...loginProps} onSubmit={auth} />;
  }
}
