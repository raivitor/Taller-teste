import React, { Component } from 'react';
import CompanyOrderTable from './CompanyOrderTable';
import $ from 'jquery';

export default class CompanyBox extends Component {
    constructor(props) {
        super(props);
        this.state = { company: { company_name: "", company_cnpj: "" } }
        this.getCompany = this.getCompany.bind(this);
    }

    componentWillMount() {
        this.getCompany();
    }

    getCompany() {
        $.ajax({
            url: 'https://churras.herokuapp.com/company/' + this.props.match.params.number,
            contentType: 'application/json',
            dataType: 'json',
            type: 'get',
            success: function (company) { this.setState({ company: company[0] }) }.bind(this),
            error: function (err) { console.log(err); }
        });
    }

    render() {
        return (
            <div className="col-md-12">
                <h3>{this.state.company.company_name + " - " + this.state.company.company_cnpj}</h3>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <CompanyOrderTable id_company={this.props.match.params.number} />
                    </div>
                </div>
            </div>
        );
    }
}