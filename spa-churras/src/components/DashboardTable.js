import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';

export default class DashboardTable extends Component {
    constructor() {
        super();
        this.state = { companies: [] };
    }

    componentWillMount() {
        this.atualizarTabela();
    }

    atualizarTabela() {
        $.ajax({
            url: 'http://localhost:3000/company',
            contentType: 'application/json',
            dataType: 'json',
            type: 'get',
            success: function (newsCompanies) {
                this.setState({ companies: newsCompanies });
            }.bind(this),
            error: function (err) { console.log(err); }
        });
    }

    render() {
        var companies = this.state.companies.map(function (company) {
            return (
                <tr key={company.id_company}>
                    <td>{company.company_name}</td>
                    <td>{company.company_cnpj}</td>
                    <td><Link to={"company/"+company.id_company}>{company.numberOrder}</Link></td>
                </tr>
            );
        });
        return (
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Nome Fantasia</th>
                        <th>CNPJ</th>
                        <th>Pedidos</th>
                    </tr>
                </thead>
                <tbody>
                    {companies}
                </tbody>
            </table>
        );
    }
}