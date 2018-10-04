import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Admin, Home, Login } from 'app/containers';
import { NotFound } from 'app/components';

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

export class App extends React.Component<App.Props> {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/admin" exact component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
