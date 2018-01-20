import React, { Component } from 'react';
import CompanyOrderTable from './CompanyOrderTable';

export default class CompanyBox extends Component {
    constructor(props){
        super(props);
        console.log(props.match.params.number);
    }
    render() {
        return (
            <div className="col-md-12">
                <h3>Empresa X</h3>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <CompanyOrderTable id_company={this.props.match.params.number} />
                    </div>
                </div>
            </div>
        );
    }
}