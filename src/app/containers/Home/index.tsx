import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {Login} from "app/components";

export namespace Home {
  export interface Props extends RouteComponentProps<void> {

  }
}

export class Home extends React.Component<Home.Props> {
  render() {
    return (
      <div>
        <Login/>
      </div>
    );
  }
}
