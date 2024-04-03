
import React from 'react';
import { connect } from 'react-redux';
import { initiateLogout } from '../actions/auth';
import { history } from '../router/AppRouter';

class Logout extends React.Component {
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initiateLogout()).then(() => history.push('/'));
  }

  render() {
    return null;
  }
}

export default connect()(Logout);