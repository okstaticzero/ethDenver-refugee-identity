import PropTypes from 'prop-types';
import React from 'react';
import { TextField, FontIcon } from 'react-md';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = props => {
    //TODO: solve error:
    // Hash history cannot PUSH the same path; a new entry will not be added to the history stack
    return (
        <div className="nav">
            
            <div className="title-wrapper">
                <NavLink to="/"><h2>RefugeID</h2></NavLink>
            </div>

            <div className="input-wrapper">
                <TextField
                    id="search-with-icon-left"
                    className="search-input"
                    label="Search refugee blockchain by id, name or origin.. "
                    type="search"
                    leftIcon={<FontIcon className="search-font">search</FontIcon>}
                    size={50}
                    customSize="searchText"
                    fullWidth={true}
                    onChange={ value => props.newSearchParams(value) }
                    onFocus={ props.redirectUserToSearch }
                />
            </div>
        </div>
    );
};

Nav.propTypes = {
    redirectUserToSearch: PropTypes.func,
};

export default Nav;
