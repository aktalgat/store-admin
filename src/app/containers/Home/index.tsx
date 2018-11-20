import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Header } from 'app/containers';

export namespace Home {
  export interface Props extends RouteComponentProps<void> {}
}

export class Home extends React.Component<Home.Props> {
  render() {
    return (
      <div>
        <Header />
        <div>Hello home</div>
      </div>
    );
  }
}
