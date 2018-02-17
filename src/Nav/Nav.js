import PropTypes from 'prop-types';
import React from 'react';
import { Toolbar, TextField, FontIcon } from 'react-md';

import './Nav.css';

const Nav = props => {
    return (
        <div className="nav">
            
            <div className="title-wrapper">
                <Toolbar title="RefugeID" />
            </div>

            <div className="input-wrapper">
                <TextField
                    id="search-with-icon-left"
                    className="search-input"
                    label="Search refugee blockchain by id, name or origin.. "
                    type="search"
                    leftIcon={<FontIcon>search</FontIcon>}
                    size={150}
                    customSize="searchText"
                    fullWidth={true}
                    onChange={() => {}}
                />
            </div>
        </div>
    );
};

Nav.propTypes = {
};

export default Nav;
