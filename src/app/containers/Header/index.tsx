import * as React from 'react';
import { HeaderBar } from 'app/components';
import {connect} from "react-redux";
import {RootState} from "app/reducers";
import {bindActionCreators, Dispatch} from "redux";
import {updateIntl} from "react-intl-redux";
import {UserModel} from "app/models";
import {LoginActions} from "app/actions";

export namespace Header {
  export interface Props {
    user?: UserModel;
    currentLocale?: any;
    locales?: any;
    updateIntl?: any;
    logout?: any;
  }
}

@connect(
  (state: RootState): Pick<Header.Props, 'currentLocale' | 'locales' | 'user'> => {
    return {
      currentLocale: state.intl.locale,
      locales: state.locales,
      user: state.user
    };
  },
  (dispatch: Dispatch): Pick<Header.Props, 'updateIntl' | 'logout'> => ({
    updateIntl: bindActionCreators(updateIntl, dispatch),
    logout: bindActionCreators(LoginActions.logout, dispatch)
  })
)
export class Header extends React.Component<Header.Props> {
  render() {
    const isExpired = this.props.user && this.props.user.isExpired ? this.props.user.isExpired : true;
    const headerFields = this.props as HeaderBar.Props;
    return (
      <header>
        <HeaderBar {...headerFields} isExpired={isExpired} />
      </header>
    );
  }
}
