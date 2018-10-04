import * as React from 'react';

export class LoginForm extends React.Component {
  render() {
    return (
      <div className="login-div">
        <form className="form-login">
          <img className="mb-4" src="" alt="" width="72" height="72"/>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          <div className="checkbox mb-3">
            <label><input type="checkbox" value="remember-me"/> Remember me </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
      </div>
    );
  }
}
