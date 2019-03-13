import * as React from 'react';
import { Link } from 'react-router-dom';

export namespace HeaderBar {
  export interface Methods {
    updateIntl: any;
    logout: any;
  }

  export interface Fields {
    currentLocale: any;
    locales: any;
    isExpired: boolean;
  }

  export interface Props extends Methods, Fields {}
}

export class HeaderBar extends React.Component<HeaderBar.Props> {
  handleLangClick = (locale: any) => {
    this.props.updateIntl({
      locale: locale,
      messages: this.props.locales[locale]
    });
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { currentLocale, locales } = this.props;
    const logoutButton = !this.props.isExpired ?
      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.handleLogout}>Logout</button>
      : '';
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          Store
        </Link>
        <div className="nav navbar-nav ml-auto">
          {Object.keys(locales).map((locale) => (
            <button type="button"
              key={locale}
              className={'btn btn-sm ' + (currentLocale == locale ? 'btn-primary' : 'btn-outline-secondary')}
              onClick={() => this.handleLangClick(locale)}>
              {locales[locale].lang}
            </button>
          ))}
          &nbsp;
          {logoutButton}
        </div>
      </nav>
    );
  }
}
