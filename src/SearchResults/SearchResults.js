import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Toolbar, TextField, FontIcon, Card, CardTitle } from 'react-md';

import './SearchResults.css';
import 'material-design-icons/iconfont/material-icons.css';

export class SearchResults extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="searchResults">
                <Card>
                    <CardTitle 
                        className="searchResults-wrapper"
                        title={`${this.props.allRefugees.length} Matches`} />
                </Card>
            </div> 
        );
    }

}

SearchResults.propTypes = {
    dispatch: PropTypes.func,
    allRefugees: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        allRefugees: state.app.allRefugees,
    };
}

export default withRouter(connect(mapStateToProps)(SearchResults));