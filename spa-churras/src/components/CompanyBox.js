import React, { Component } from 'react';

export default class CompanyBox extends Component {
    constructor(props){
        super(props);
        console.log(props.match.params.number);
    }
    render() {
        return (
            <h3>Company Box {this.props.match.params.number}</h3>
        );
    }
}