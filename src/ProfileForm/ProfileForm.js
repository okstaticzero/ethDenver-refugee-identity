import React, { Component } from "react";
import PropTypes from "prop-types";
// import MainAvatar from "./MainAvatar";
import {
    TextField,
    Card,
    Grid,
    Cell,
    SelectField,
    FontIcon,
} from "react-md";
// import monthsAndDays from "../utils/monthsAndDay";
// import FIELDS from "../utils/fields";
// import ChangePasswordForm from "./ChangePasswordForm";
// import UserEditButtons from "./UserEditButtons";
// import UserCancelSubmitButtons from "./UserCancelSubmitButtons";
// import AdminEditButtons from "./AdminEditButtons";
// import AddNewEmployeeForm from "./AddNewEmployeeForm";

import "./ProfileForm.css";

export class ProfileForm extends Component {
    constructor(props) {
        super(props);
        const stateObj = FIELDS.reduce((obj, item) => {
            obj[item] = this.props.user[item];
            return obj;
        }, {});
        // stateObj.showDeleteUser = false;
        // stateObj.showAddEmployeeModal = false;
        // stateObj.notEditing = true;
        // stateObj.max = 340;
        // stateObj.showChangePassword = false;
        // this.state = stateObj;
        // this.getDays = this.getDays.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        // this.cancelSubmit = this.cancelSubmit.bind(this);
        // this.buttonsOnPage = this.buttonsOnPage.bind(this);
        // this.toggleEditState = this.toggleEditState.bind(this);
        // this.toggleEditEmployeeModal = this.toggleEditEmployeeModal.bind(this);
        // this.toggleChangePassword = this.toggleChangePassword.bind(this);
        // this.toggleDeleteEmployee = this.toggleDeleteEmployee.bind(this);
    }

    // componentWillUnmount() {
    //     this.props.clearUploadImage();
    // }

    componentWillReceiveProps(nextProps) {
        const stateObj = FIELDS.reduce((obj, item) => {
            obj[item] = nextProps.user[item];
            return obj;
        }, {});

        this.setState((prevState, props) => {
            return stateObj;
        });
    }

    // toggleEditEmployeeModal() {
    //     if (this.props.locationList.length == 0) {
    //         this.props.getListOfLocations();
    //         this.props.getListOfDepartments();
    //     }
    //     this.setState((prevState, props) => {
    //         return { showAddEmployeeModal: !prevState.showAddEmployeeModal };
    //     });
    // }

    // toggleChangePassword() {
    //     this.setState((prevState, props) => {
    //         return { showChangePassword: !prevState.showChangePassword };
    //     });
    // }

    // toggleDeleteEmployee() {
    //     this.setState((prevState, props) => {
    //         return { showDeleteUser: !prevState.showDeleteUser };
    //     });
    // }

    toggleEditState() {
        if (this.state.notEditing) {
            // this.props.getListOfManagers();
            // this.props.getListOfLocations();
            // this.props.getListOfDepartments();
        }
        this.setState((prevState, props) => {
            return { notEditing: !prevState.notEditing };
        });
    }

    buttonsOnPage() {
        if (
            Number(this.props.userId) !== Number(this.props.me.id) &&
            Number(this.props.me.isAdmin)
        )
            return (
                <Cell size={4} offset={0} order={3}>
                    <AdminEditButtons
                        removeEmployee={this.toggleDeleteEmployee}
                        toggleEditEmployeeModal={this.toggleEditEmployeeModal}
                    />
                </Cell>
            );
        if (Number(this.props.userId) !== Number(this.props.me.id)) return null;
        return (
            <Cell size={4} offset={2} order={3}>
                {!this.state.notEditing ? (
                    <UserCancelSubmitButtons
                        cancelSubmit={this.cancelSubmit}
                        onSubmit={this.onSubmit}
                    />
                ) : (
                        <UserEditButtons
                            cancelSubmit={this.cancelSubmit}
                            toggleChangePassword={this.toggleChangePassword}
                            changeEditState={this.toggleEditState}
                        />
                    )}
            </Cell>
        );
    }

    // getDays() {
    //     let currentMonth = monthsAndDays.filter(
    //         item => item.value === monthsAndDays[this.state.birthMonth - 1].value
    //     );
    //     let arr = [...Array(currentMonth[0].days + 1).keys()];
    //     arr.shift();
    //     return arr;
    // }

    onSubmit(values) {
        this.toggleEditState();
        const propsObj = FIELDS.reduce((obj, item) => {
            obj[item] = this.state[item];
            return obj;
        }, {});
        if (this.props.cloudImage) {
            propsObj.photoUrl = this.props.cloudImage;
        }
        delete propsObj.email;
        propsObj.id = this.props.user.id;
        let company = propsObj;
        this.props.submitForm(company);
    }

    cancelSubmit() {
        this.profileFrom.reset();
        this.setState((prevState, props) => {
            const propsObj = FIELDS.reduce((obj, item) => {
                obj[item] = this.props.user[item];
                return obj;
            }, {});
            if (this.props.cloudImage) {
                this.props.clearUploadImage();
            }
            propsObj.notEditing = true;
            return propsObj;
        });
    }

    render() {
        let avatarImage = this.props.user.photoUrl;
        if (avatarImage === "img/default.jpg" || avatarImage === "") {
            avatarImage = null;
        }
        if (this.props.cloudImage) {
            avatarImage = this.props.cloudImage;
        }

        return (
            <div className="UserProfileForm">
                <ChangePasswordForm
                    showChangePassword={this.state.showChangePassword}
                    submitForm={this.props.submitForm}
                    hideModal={this.toggleChangePassword}
                    userId={this.props.user.id}
                />
                <AddNewEmployeeForm
                    onSubmit={this.props.adminEditEmployeeDetails}
                    showAddEmployeeModal={this.state.showAddEmployeeModal}
                    hideModal={this.toggleEditEmployeeModal}
                    header="Update User Information"
                    submitButtonTitle="Update"
                    userObj={this.props.user}
                    locationList={this.props.locationList}
                    departmentList={this.props.departmentList}
                />

                <DeleteUserModal
                    showDeleteUser={this.state.showDeleteUser}
                    onSubmit={this.props.adminDeleteEmployee}
                    hideModal={this.toggleDeleteEmployee}
                    userId={this.props.user.id}
                />
                <form ref={el => (this.profileFrom = el)}>
                    <Card className="md-grid md-cell--12 profile-header form-card">
                        <Grid className="header">
                            <MainAvatar
                                imageUpload={this.props.imageUpload}
                                avatarImage={avatarImage}
                                imageUploading={this.props.imageUploading}
                                notEditing={this.state.notEditing}
                            />
                            <Cell size={4} order={2} className="info">
                                <h1>
                                    {this.props.user.firstName} {this.props.user.lastName}
                                </h1>
                                <div className="upper-title">
                                    <SelectField
                                        id="departmentId-form"
                                        name="departmentId"
                                        fullWidth={true}
                                        placeholder={this.getDepartmentInfo()}
                                        value={this.state.department.id || ""}
                                        disabled={this.state.notEditing}
                                        onChange={departmentId => {
                                            this.setState((prevState, props) => {
                                                return { departmentId: departmentId };
                                            });
                                        }}
                                        menuItems={this.props.departmentList}
                                        className="md-cell manageName location-select-field"
                                    />
                                    <span className="pipe">
                                        {this.state.department.id && this.state.title ? "|" : ""}
                                    </span>
                                    <TextField
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={this.state.title}
                                        placeholder={
                                            this.state.notEditing ? "" : "Enter your title"
                                        }
                                        disabled={this.state.notEditing}
                                        onChange={title => this.setState({ title })}
                                        className="md-cell user-title"
                                    />
                                </div>

                                <SelectField
                                    id="locationId-form"
                                    name="locationId"
                                    fullWidth={true}
                                    placeholder={this.getLocationInfo()}
                                    value={this.state.location.id || ""}
                                    disabled={this.state.notEditing}
                                    onChange={location => {
                                        this.setState((prevState, props) => {
                                            return { locationId: location };
                                        });
                                    }}
                                    menuItems={this.props.locationList}
                                    className="md-cell manageName location-select-field"
                                />
                            </Cell>
                            {this.buttonsOnPage()}
                        </Grid>
                    </Card>
                    <Card className="md-grid form-card md-cell--12">
                        <Grid>
                            <Cell size={8} order={1}>
                                <label className="form-main-label">About</label>
                                <TextField
                                    id="bio"
                                    name="bio"
                                    type="text"
                                    value={this.state.bio}
                                    label="Tell us a bit about yourself"
                                    disabled={this.state.notEditing}
                                    onChange={bio => this.setState({ bio })}
                                    className="md-cell"
                                    resize={{ min: 250, max: this.state.max }}
                                    rows={5}
                                />

                                <label className="form-main-label">fun fact</label>
                                <TextField
                                    id="funFact"
                                    name="funFact"
                                    type="text"
                                    value={this.state.funFact}
                                    label="Everyone's got one!"
                                    disabled={this.state.notEditing}
                                    onChange={funFact => this.setState({ funFact })}
                                    className="md-cell"
                                />

                                <label className="form-main-label">hobbies</label>
                                <TextField
                                    id="hobbies"
                                    name="hobbies"
                                    type="text"
                                    value={this.state.hobbies}
                                    label="What do you like to do?"
                                    disabled={this.state.notEditing}
                                    onChange={hobbies => this.setState({ hobbies })}
                                    className="md-cell"
                                />

                                <label className="form-main-label">food preferences</label>
                                <TextField
                                    id="foodPref"
                                    name="foodPref"
                                    type="text"
                                    value={this.state.foodPref}
                                    label="Any allergies or strong dislikes?"
                                    disabled={this.state.notEditing}
                                    onChange={foodPref => this.setState({ foodPref })}
                                    className="md-cell"
                                />

                                <div className="birthday-picker">
                                    <label className="form-main-label">Birthday</label>
                                    <SelectField
                                        id="month"
                                        name="month"
                                        value={
                                            monthsAndDays[this.state.birthMonth - 1].value ||
                                            "January"
                                        }
                                        disabled={this.state.notEditing}
                                        menuItems={monthsAndDays}
                                        onChange={month =>
                                            this.setState((prevState, props) => {
                                                return { birthMonth: month };
                                            })}
                                        className="md-cell"
                                    />
                                    <SelectField
                                        id="days"
                                        name="days"
                                        value={this.state.birthDay || 31}
                                        disabled={this.state.notEditing}
                                        onChange={day =>
                                            this.setState((prevState, props) => {
                                                return { birthDay: day };
                                            })}
                                        menuItems={this.getDays()}
                                        className="md-cell"
                                    />
                                </div>

                                <label className="form-main-label">dreams for the future</label>
                                <TextField
                                    id="dreamFuture"
                                    name="dreamFuture"
                                    type="text"
                                    value={this.state.dreamFuture}
                                    label="Where do you see yourself?"
                                    disabled={this.state.notEditing}
                                    onChange={dreamFuture => this.setState({ dreamFuture })}
                                    className="md-cell"
                                />

                                <label className="form-main-label">favorite animal</label>
                                <TextField
                                    id="favAnimal"
                                    name="favAnimal"
                                    type="text"
                                    value={this.state.favAnimal}
                                    label="yes, it can be a mythical creature"
                                    disabled={this.state.notEditing}
                                    onChange={favAnimal => this.setState({ favAnimal })}
                                    className="md-cell"
                                />
                            </Cell>

                            <Cell size={4} order={2}>
                                <label className="form-main-label">Contact Info</label>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    leftIcon={<FontIcon>email</FontIcon>}
                                    disabled={true}
                                    className="md-cell"
                                />
                                <TextField
                                    id="slackName"
                                    name="slackName"
                                    type="text"
                                    placeholder="Slack Username"
                                    value={`@${this.state.slackName}`}
                                    leftIcon={<FontIcon>message</FontIcon>}
                                    disabled={this.state.notEditing}
                                    onChange={slackName =>
                                        this.setState({ slackName: slackName.replace("@", "") })}
                                    className="md-cell"
                                />
                                <TextField
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={this.state.phone}
                                    leftIcon={<FontIcon>phone</FontIcon>}
                                    disabled={this.state.notEditing}
                                    onChange={phone => this.setState({ phone })}
                                    className="md-cell"
                                />

                                <label className="form-main-label">Start Date</label>

                                <DatePicker
                                    id="hireDate"
                                    name="hireDate"
                                    inline
                                    displayMode="landscape"
                                    fullWidth={true}
                                    value={new Date(
                                        this.state.hireDate
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                    onChange={hireDate => {
                                        let formateDate = new Date(hireDate)
                                            .toISOString()
                                            .replace(/T/, " ")
                                            .replace(/\..+/, "");
                                        this.setState({ hireDate: formateDate });
                                    }}
                                    disabled={this.state.notEditing}
                                />

                                <label className="form-main-label">Manager</label>

                                <SelectField
                                    id="managerId"
                                    name="managerId"
                                    placeholder={this.getManagerInfo()}
                                    value={this.state.managerId || ""}
                                    disabled={this.state.notEditing}
                                    onChange={manager => {
                                        this.setState((prevState, props) => {
                                            return { managerId: manager };
                                        });
                                    }}
                                    menuItems={this.props.managerList}
                                    className="md-cell manageName"
                                />

                                <label className="form-main-label">Spoken languages</label>
                                <TextField
                                    id="languages"
                                    name="languages"
                                    type="text"
                                    placeholder="What are you fluent in?"
                                    value={this.state.languages}
                                    disabled={this.state.notEditing}
                                    onChange={languages => this.setState({ languages })}
                                    className="md-cell"
                                />

                                <label className="form-main-label">Skills and expertise</label>
                                <TextField
                                    id="techUsed"
                                    name="techUsed"
                                    type="text"
                                    placeholder="What Is Your Stack?"
                                    value={this.state.techUsed}
                                    disabled={this.state.notEditing}
                                    onChange={techUsed => this.setState({ techUsed })}
                                    className="md-cell"
                                />

                                <label className="form-main-label">Websites</label>
                                <TextField
                                    id="linkedin"
                                    name="linkedin"
                                    type="text"
                                    placeholder="Linkedin"
                                    value={this.state.linkedin}
                                    disabled={this.state.notEditing}
                                    onChange={linkedin => this.setState({ linkedin })}
                                    className="md-cell"
                                />
                                <TextField
                                    id="github"
                                    name="github"
                                    type="text"
                                    placeholder="GitHub"
                                    value={this.state.github}
                                    disabled={this.state.notEditing}
                                    onChange={github => this.setState({ github })}
                                    className="md-cell"
                                />
                                <TextField
                                    id="portfolioSite"
                                    name="portfolioSite"
                                    type="text"
                                    placeholder="Personal Site"
                                    value={this.state.portfolioSite}
                                    disabled={this.state.notEditing}
                                    onChange={portfolioSite => this.setState({ portfolioSite })}
                                    className="md-cell"
                                />
                            </Cell>
                        </Grid>
                    </Card>
                </form>
            </div>
        );
    }
}

UserProfileForm.propTypes = {
    user: PropTypes.object,
    me: PropTypes.object,
    userId: PropTypes.number,
    submitForm: PropTypes.func,
    cloudImage: PropTypes.string,
    clearUploadImage: PropTypes.func,
    imageUpload: PropTypes.func,
    imageUploading: PropTypes.bool,
    adminEditEmployeeDetails: PropTypes.func,
    adminDeleteEmployee: PropTypes.func,
    getListOfManagers: PropTypes.func,
    getListOfLocations: PropTypes.func,
    getListOfDepartments: PropTypes.func,
    managerList: PropTypes.array,
    locationList: PropTypes.array,
    departmentList: PropTypes.array,
};

export default UserProfileForm;
