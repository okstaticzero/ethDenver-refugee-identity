import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileForm from "../UserProfileForm";
// import {
//     submitForm,
//     getEmployeeDetails,
//     imageUpload,
//     clearUploadImage,
//     getListOfManagers,
//     getListOfLocations,
//     getListOfDepartments,
// } from "../store/actions/userProfileAction";

// import {
//     adminEditEmployeeDetails,
//     adminDeleteEmployee,
// } from "../store/actions/adminAction";

export class UserProfile extends Component {
    // componentDidMount() {
    //     this.props.getEmployeeDetails(this.props.match.params.id);
    // }
    // componentWillReceiveProps(nextProps) {
    //     if (this.props.match.params.id !== nextProps.match.params.id) {
    //         this.props.getEmployeeDetails(nextProps.match.params.id);
    //     }
    // }

    render() {
        return (
            <ProfileForm />
        );
    }
}

// UserProfile.propTypes = {
//     match: PropTypes.object,
//     dispatch: PropTypes.func,
//     user: PropTypes.object,
//     me: PropTypes.object,
//     submitForm: PropTypes.func,
//     imageUpload: PropTypes.func,
//     clearUploadImage: PropTypes.func,
//     cloudImage: PropTypes.string,
//     getEmployeeDetails: PropTypes.func,
//     imageUploading: PropTypes.bool,
//     adminEditEmployeeDetails: PropTypes.func,
//     adminDeleteEmployee: PropTypes.func,
//     getListOfManagers: PropTypes.func,
//     managerList: PropTypes.array,
//     getListOfLocations: PropTypes.func,
//     getListOfDepartments: PropTypes.func,
//     locationList: PropTypes.array,
//     departmentList: PropTypes.array,
// };

const mapStateToProps = state => ({
    // user: state.auth.userView,
    // me: state.auth.me,
    // cloudImage: state.auth.cloudImage,
    // imageUploading: state.auth.imageUploading,
    // managerList: state.company.managerList,
    // locationList: state.company.locationList,
    // departmentList: state.company.departmentList,
});

export default connect(mapStateToProps)(UserProfile);
