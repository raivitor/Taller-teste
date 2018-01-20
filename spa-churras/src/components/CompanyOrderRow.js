import React, { Component } from 'react';

export default class CompanyOrderTable extends Component {
    render() {
        var produtos = this.props.produtos.map(function (produto, i) {
            return (
                <span key={i}>{"" + produto.product_name + " " + produto.quant_product + "x"}<br /></span>
            );
        });
        if (!this.props.id_order) {
            return (
                <tr>
                    <td align="center" colSpan="3" className="active">Nenhum pedido cadastrado</td>
                </tr>
            );
        }
        return (
            <tr>
                <td align="center">{this.props.id_order}</td>
                <td align="center">{produtos}</td>
                <td align="center"><button type="button" className="btn btn-danger" onClick={() => this.props.deleteOrder(this.props.id_order)}>EXCLUIR</button></td>
            </tr>
        );
    }
}