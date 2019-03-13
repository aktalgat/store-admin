import * as React from 'react';
import { HeaderBar } from 'app/components';
import {connect} from "react-redux";
import {RootState} from "app/reducers";
import {bindActionCreators, Dispatch} from "redux";
import {updateIntl} from "react-intl-redux";
import {UserModel} from "app/models";

export namespace Header {
  export interface State {
    isExpired: boolean;
  }

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
    logout: bindActionCreators(updateIntl, dispatch)
  })
)
export class Header extends React.Component<Header.Props, Header.State> {
  constructor(props: Header.Props) {
    super(props);
    this.state = {
      isExpired: false
    };
  }

  componentWillReceiveProps(nextProps: Header.Props) {
    if (nextProps && nextProps.user) {
      this.setState({isExpired: nextProps.user.isExpired});
    }
  }

  render() {
    const headerFields = this.props as HeaderBar.Props;
    return (
      <header>
        <HeaderBar {...headerFields} isExpired={this.state.isExpired} />
      </header>
    );
  }
}
