import React, { Component } from 'react';
import NewOrderForm from './NewOrderForm';
export default class CompanyBox extends Component {
    render() {
        return (
            <div className="col-md-12">
                <h3>Novo Pedido</h3>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <NewOrderForm />
                    </div>
                </div>
            </div>
        );
    }
}