import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddNew from "../AddNew/AddNew";

export class NewUserContainer extends Component {

    componentDidMount() {
        // this.props.getEmployeeDetails(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.match.params.id !== nextProps.match.params.id) {
        //     this.props.getEmployeeDetails(nextProps.match.params.id);
        // }
    }

    render() {
        return (
            <AddNew
                {...this.props}
            />
        );
    }
}

NewUserContainer.propTypes = {
    match: PropTypes.object,
    dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
    // user: state.auth.userView,
});

export default connect(mapStateToProps)(NewUserContainer);
