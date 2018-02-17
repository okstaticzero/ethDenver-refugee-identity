import PropTypes from 'prop-types';
import React from 'react';
import { Toolbar, TextField, FontIcon } from 'react-md';

import './Nav.css';

const sortByString = (array, sortParam = 'firstName') => {
    const newArr = [...array].sort(function (a, b) {
        var nameA = a[sortParam].toUpperCase(); // ignore upper and lowercase
        var nameB = b[sortParam].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    return newArr;
};


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
                    onChange={ sortByString }
                />
            </div>
        </div>
    );
};

Nav.propTypes = {
};

export default Nav;
