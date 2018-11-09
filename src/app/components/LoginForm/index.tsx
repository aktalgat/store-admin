import * as React from 'react';

export namespace LoginForm {
  export interface Methods {
    onSubmit: any;
  }

  export interface Fields {
    messages: any;
    error: string;
  }

  export interface Props extends Methods, Fields {}

  export interface State {
    login: string;
    password: string;
    remember: boolean;
    error: string;
  }
}

export class LoginForm extends React.Component<LoginForm.Props, LoginForm.State> {
  constructor(props: LoginForm.Props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      remember: false,
      error: ''
    };
  }

  handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ login: e.target.value });
  };

  handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ remember: e.target.checked });
  };

  handleClickLogin = (): void => {
    this.submitLogin();
  };

  handlePasswordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      this.submitLogin();
    }
  };

  submitLogin = () => {
    this.props.onSubmit({
      login: this.state.login,
      password: this.state.password,
      remember: this.state.remember
    });
  };

  render() {
    return (
      <div className="login-div">
        <form className="form-login">
          <img className="mb-4" src="" alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="text"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            onChange={this.handleLoginChange} />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            onChange={this.handlePasswordChange}
            onKeyPress={this.handlePasswordKeyPress} />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultChecked={false} onChange={this.handleRememberChange}
                     autoComplete={"new-password"} /> Remember me{' '}
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.handleClickLogin}>
            Log in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
      </div>
    );
  }
}
