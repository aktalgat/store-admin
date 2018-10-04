import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {AdminForm} from "app/components";

export namespace Admin {
  export interface Props extends RouteComponentProps<void> {}
}

export class Admin extends React.Component<Admin.Props> {
  render() {
    return <div><AdminForm/></div>;
  }
}
