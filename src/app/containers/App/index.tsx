import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Admin, Header, Login } from 'app/containers';
import { NotFound } from 'app/components';

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

export class App extends React.Component<App.Props> {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Admin} />
          <Route path="/login" exact component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
