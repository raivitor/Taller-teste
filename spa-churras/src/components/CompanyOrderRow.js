import React, { Component } from 'react';

export default class CompanyOrderTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var produtos = this.props.produtos.map(function (produto) {
            return (
                <span>{""+produto.product_name+" "+produto.quant_product+"x"}<br/></span>
            );
        });
        return (
            <tr key={this.props.id_order}>
                <td>{this.props.id_order}</td>
                <td>{produtos}</td>
                <td>Excluir</td>
            </tr>
        );
    }
}