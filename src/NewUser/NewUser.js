import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddNew from "../AddNew/AddNew";

export class NewUserContainer extends Component {
  render() {
    return <AddNew disabelForm={false} title={"Add New Refugee"} />;
  }
}

NewUserContainer.propTypes = {
  match: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(null)(NewUserContainer);
