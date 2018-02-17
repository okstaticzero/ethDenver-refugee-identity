import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router';
import Accounts from '../accounts/Accounts';
import './App.css';
import 'material-design-icons/iconfont/material-icons.css';

import Nav from '../Nav/Nav';
// import SearchResults from '../SearchResults';
// import ProfileContainer from '../ProfileContainer';
{/* <Route path="/search" component={SearchResults} /> */ }
// <Route path="/profile/:id" component={ProfileContainer} />
export class App extends Component {

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <Nav />
        </div>
        <Route exact path="/" component={Accounts} />
      </div>
    );
  }

}

App.propTypes = {
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    // todos: state.todos,
    // user: state.accounts.currentUser,
    // loading: state.loadingState.loading
  };
}

export default withRouter(connect(mapStateToProps)(App));