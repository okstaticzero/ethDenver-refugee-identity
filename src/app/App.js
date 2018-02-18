import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Route } from "react-router";
import Accounts from "../accounts/Accounts";
import NewUserContainer from "../NewUser/NewUser";
import Loader from "../Loader";

import "./App.css";
import "material-design-icons/iconfont/material-icons.css";

import Nav from "../Nav/Nav";
import {
  redirectUserToSearch,
  getAllRefugees,
  newSearchParams
} from "./AppActions.js";

import SearchResults from "../SearchResults/SearchResults";
import ProfileContainer from "../ProfileContainer/ProfileContainer";

export class App extends Component {

  componentDidMount() {
    this.props.getAllRefugees();
  }

  render() {
    return (
      <div className="App">
        {this.props.loading && <Loader />}
        <div className="App-header">
          <Nav
            newSearchParams={this.props.newSearchParams}
            redirectUserToSearch={this.props.redirectUserToSearch}
          />
        </div>

        <Route exact path="/" component={Accounts} />
        <Route path="/search" component={SearchResults} />
        <Route path="/addnew" component={NewUserContainer} />
        <Route path="/profile/:id" component={ProfileContainer} />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  redirectUserToSearch: PropTypes.func,
  getAllRefugees: PropTypes.func,
  newSearchParams: PropTypes.func
};

function mapStateToProps(state) {
  return {
    allRefugees: state.app.allRefugees,
    loading: state.loadingState.loading
  };
}

export default withRouter(
  connect(mapStateToProps, {
    redirectUserToSearch,
    getAllRefugees,
    newSearchParams
  })(App)
);
