import PropTypes from 'prop-types';
import React from 'react';
import { Avatar, MenuButton, ListItem, Toolbar, KebabMenu } from 'react-md';

import './Nav.css';

const Nav = props => {
    return (
        <div className="nav">
            <Toolbar
                title="RefugeID"
            />
        </div>
    );
};

Nav.propTypes = {
};

export default Nav;
