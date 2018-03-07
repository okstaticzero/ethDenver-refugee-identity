import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddNew from "../AddNew/AddNew";
import { profileView } from "./ProfileActions.js";

export class ProfileContainer extends Component {

  componentDidMount() {
    this.props.profileView(this.props.match.params);
  }

  render() {
    if (!this.props.user) return <h2>LOADING</h2>;
    return <AddNew 
      disabelForm={true} 
      viewUser={this.props.user} 
      />;
  }
}

ProfileContainer.propTypes = {
  match: PropTypes.object,
  dispatch: PropTypes.func,
  profileView: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.app.userProfile
});

export default connect(mapStateToProps, { profileView })(ProfileContainer);
