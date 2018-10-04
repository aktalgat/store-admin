import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { LoginForm } from 'app/components';

export namespace Login {
  export interface Props extends RouteComponentProps<void> {}
}

export class Login extends React.Component<Login.Props> {
  render() {
    return <LoginForm />;
  }
}
