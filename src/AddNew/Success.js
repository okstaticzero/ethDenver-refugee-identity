import React, { Component } from 'react';
import { Button, DialogContainer, List, ListItem } from 'react-md';
import PropTypes from "prop-types";
import circle from "../assets/images/circle.png";

const Success = props => {
        return (
            <div>
                <DialogContainer
                    id="success"
                    visible={ props.visible}
                    title=""
                    onHide={ props.onHide}
                    focusOnMount={false} >

                    <img src={circle} alt="success" />
                    <h1>Success!</h1>
                    <p>{props.user} now has access to update their profile.</p>

                </DialogContainer>
            </div>
        );
}

Success.propTypes = {
    // redirectUserToSearch: PropTypes.func
};

export default Success;