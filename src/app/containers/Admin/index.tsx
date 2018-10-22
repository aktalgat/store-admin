import * as React from 'react';
import {Redirect, RouteComponentProps} from 'react-router';
import { AdminForm } from 'app/components';

export namespace Admin {
  export interface Props extends RouteComponentProps<void> {}
}

export class Admin extends React.Component<Admin.Props> {
  isAuth(): boolean {
    let token = sessionStorage.getItem('token') || '';
    return token != null && token !== '';
  }

  render() {
    if (this.isAuth()) {
      return <AdminForm />;
    } else {
      return <Redirect to="/login"/>
    }
  }
}
