import React, { Component } from 'react';
import $ from 'jquery';
import CompanyOrderRow from './CompanyOrderRow';

export default class CompanyOrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = { orders: [], redirect: false }
        this.tratarRetorno = this.tratarRetorno.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    componentWillMount() {
        this.atualizarTabela();
    }

    atualizarTabela() {
        $.ajax({
            url: 'https://churras.herokuapp.com/order/' + this.props.id_company,
            contentType: 'application/json',
            dataType: 'json',
            type: 'get',
            success: function (orders) { this.tratarRetorno(orders) }.bind(this),
            error: function (err) { console.log(err); }
        });
    }

    deleteOrder(id_order) {
        $.ajax({
            url: 'https://churras.herokuapp.com/order/' + id_order,
            contentType: 'application/json',
            dataType: 'json',
            type: 'delete',
            success: function (orders) { this.atualizarTabela() }.bind(this),
            error: function (err) { console.log(err); }
        });
    }

    tratarRetorno(orders) {
        if (!orders.length) {
            orders = [{ "id_order": "", "produtos": [] }]
            this.setState({ orders })
            return
        }
        let auxId = 0
        let newOrder = [] // Star Wars \,,/
        let newOrders = [];
        for (let i = 0; i < orders.length; i++) {
            if (auxId === orders[i].id_order) {
                newOrder.push({ "product_name": orders[i].product_name, "quant_product": orders[i].quant_product })
            }
            else {
                newOrders.push({ "id_order": auxId, "produtos": newOrder })
                newOrder = []
                newOrder.push({ "product_name": orders[i].product_name, "quant_product": orders[i].quant_product })
                auxId = orders[i].id_order
            }
        }
        newOrders.push({ "id_order": orders[orders.length - 1].id_order, "produtos": newOrder })
        newOrder = newOrders.shift();
        this.setState({ orders: newOrders })
    }

    render() {
        var deleteFunc = this.deleteOrder
        var orders = this.state.orders.map(function (order) {
            return (
                <CompanyOrderRow key={order.id_order} id_order={order.id_order} produtos={order.produtos} deleteOrder={deleteFunc} />
            );
        });
        return (
            <table className="table table-hover table-bordered" >
                <thead>
                    <tr>
                        <th className="text-center">Código do pedido</th>
                        <th className="text-center">Itens do pedido</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {orders}
                </tbody>
            </table>
        );
    }
}