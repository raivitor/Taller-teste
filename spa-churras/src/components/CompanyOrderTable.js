import React, { Component } from 'react';
import $ from 'jquery';
import CompanyOrderRow from './CompanyOrderRow';

export default class CompanyOrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = { orders: [] }
        this.tratarRetorno = this.tratarRetorno.bind(this);
    }

    componentWillMount() {
        this.atualizarTabela();
    }

    atualizarTabela() {
        $.ajax({
            url: 'http://localhost:3000/order/' + this.props.id_company,
            contentType: 'application/json',
            dataType: 'json',
            type: 'get',
            success: function (orders) {
                //this.setState({ orders })
                this.tratarRetorno(orders)
            }.bind(this),
            error: function (err) { console.log(err); }
        });
    }

    tratarRetorno(orders) {
        console.log(orders);    
        let auxId = 0
        let newOrder = [] // Star Wars \,,/
        let newOrders = [];
        for (let i = 0; i < orders.length; i++) {
            if (auxId == orders[i].id_order) {
                newOrder.push({ "product_name": orders[i].product_name, "quant_product": orders[i].quant_product })
            } 
            else{
                newOrders.push({ "id_order": auxId, "produtos": newOrder })
                newOrder = []
                newOrder.push({ "product_name": orders[i].product_name, "quant_product": orders[i].quant_product})
                auxId = orders[i].id_order
            }
        }
        newOrders.push({ "id_order": orders[orders.length-1].id_order, "produtos": newOrder })
        newOrder = newOrders.shift();
        this.setState({ orders: newOrders })
    }

    render() {

        var orders = this.state.orders.map(function (order) {
            return (
                <CompanyOrderRow key={order.id_order} id_order={order.id_order} produtos={order.produtos} />
            );
        });
        return (
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Código do pedido</th>
                        <th>Itens do pedido</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {orders}
                </tbody>
            </table>
        );
    }
}