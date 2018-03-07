import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, CardTitle } from 'react-md';
import { NavLink } from 'react-router-dom';
import { getAllRefugees } from "../app/AppActions.js";

import './SearchResults.css';
import 'material-design-icons/iconfont/material-icons.css';

export class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.createList = this.createList.bind(this);
    }
    
    componentDidMount() {
        this.props.getAllRefugees();
    }

    createList(data) {
        return data.filter(dataItem => {
            if (dataItem.name.toLowerCase().includes(this.props.searchParams.toLowerCase()) || dataItem.origin.toLowerCase().includes(this.props.searchParams.toLowerCase())) {
                return dataItem
            } 
            }).map((person, index) => {
                return <NavLink to={`/profile/${person.id}`} key={index}>
                        <Card  
                            className="list-items">
                            <CardTitle title={person.name} subtitle={person.origin} />
                        </Card>
                    </NavLink>
            });
    }

    render() {
        return (
            <div className="searchResults">
                <Card>
                    <CardTitle 
                        className="searchResults-card"
                        title={`${this.createList(this.props.allRefugees).length} Matches`} />
                    {
                        this.createList(this.props.allRefugees)
                    }
                </Card>
            </div> 
        );
    }

}

SearchResults.propTypes = {
    dispatch: PropTypes.func,
    getAllRefugees: PropTypes.func,
    allRefugees: PropTypes.array,
    searchParams: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        allRefugees: state.app.allRefugees,
        searchParams: state.app.searchParams,
    };
}

export default withRouter(connect(mapStateToProps, { getAllRefugees })(SearchResults));