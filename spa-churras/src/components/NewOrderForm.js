import React, { Component } from 'react';
import $ from 'jquery';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { companies: [], products: [], orders: [], id_company: '', id_product: '', product_name: "", quant_product: '', msg: "" }
        this.getProductName = this.getProductName.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.salvaAlteracao = this.salvaAlteracao.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentWillMount() {
        this.getCompanies();
        this.getProducts();
    }

    getCompanies() {
        $.ajax({
            url: 'https://churras.herokuapp.com/company',
            contentType: 'application/json',
            dataType: 'json',
            type: 'get',
            success: function (companies) { this.setState({ companies }) }.bind(this),
            error: function (err) {
                if (err.status === 500) this.setState({ msg: "Erro ao receber os dados do banco." })
                else console.log(err);
            }.bind(this)
        });
    }

    getProducts() {
        $.ajax({
            url: 'https://churras.herokuapp.com/product',
            contentType: 'application/json',
            dataType: 'json',
            type: 'get',
            success: function (products) { this.setState({ products }) }.bind(this),
            error: function (err) {
                if (err.status === 500) this.setState({ msg: "Erro ao receber os dados do banco." })
                else console.log(err);
            }.bind(this)
        });
    }

    getProductName() {
        let product_name = ""
        this.state.products.forEach(product => {
            if (product.id_product == this.state.id_product) {
                product_name = product.product_name
            }
        });
        return product_name;
    }

    addProduct(e) {
        e.preventDefault();
        let auxArray = this.state.orders
        try {
            auxArray.find(x => x.product_name === this.getProductName()).quant_product += parseInt(this.state.quant_product);
        } catch (e) {
            auxArray.push({ id_product: this.state.id_product, product_name: this.getProductName(), quant_product: parseInt(this.state.quant_product) })
        }
        this.setState({ orders: auxArray, quant_product: "", id_product: "" });
    }

    salvaAlteracao(nomeInput, evento) {
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;
        this.setState(campoSendoAlterado);
    }

    sendForm() {
        this.setState({ msg: "" })
        if (!this.state.orders.length) {
            this.setState({ msg: "Insira algum produto no pedido" })
            return 0;
        } else if (!this.state.id_company.length) {
            this.setState({ msg: "Escolha uma empresa" })
            return 0;
        }
        $.ajax({
            url: 'https://churras.herokuapp.com/order',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ id_company: this.state.id_company, produtos: this.state.orders }),
            success: function (results) {
                this.setState({ id_company: "", id_product: "", orders: [], quant_product: "", msg: "Pedido cadastrado com sucesso" })
            }.bind(this),
            error: function (err) {
                if (err.status === 500) this.setState({ msg: "Erro ao receber os dados do banco." })
                else console.log(err);
            }.bind(this)
        });
    }

    deleteProduct(id) {
        let auxArray = this.state.orders
        var removeIndex = auxArray.map(order => { order.id; }).indexOf(id);
        console.log(removeIndex);
        auxArray.splice(removeIndex, 1);
        this.setState({ orders: auxArray })
    }

    render() {
        let orders = this.state.orders.map((order, i) => {
            return (
                <tr key={i} >
                    <td>{order.product_name}</td>
                    <td>{order.quant_product}</td>
                    <td><button type="button" className="btn btn-danger" onClick={() => this.deleteProduct(i)}>EXCLUIR</button></td>
                </tr>
            )
        });

        let companies = this.state.companies.map(company => {
            return <option key={company.id_company} value={company.id_company}>{company.company_name}</option>;
        });

        let products = this.state.products.map(product => {
            return <option key={product.id_product} value={product.id_product}>{product.product_name}</option>;
        });

        return (
            <div>
                <h4 className="help-block text-center">{this.state.msg}</h4>
                <select className="form-control" name="id_company" value={this.state.id_company} onChange={this.salvaAlteracao.bind(this, 'id_company')}>
                    <option value="">Selecione uma empresa</option>
                    {companies}
                </select>
                <br /><br /><br />
                <form className="form-inline" onSubmit={this.addProduct}>
                    <div className="form-group">
                        <select className="form-control" name="id_product" value={this.state.id_product} onChange={this.salvaAlteracao.bind(this, 'id_product')}>
                            <option value="">Selecione um produto</option>
                            {products}
                        </select>
                        <input type="number" className="form-control" min="1" name="quant_product" value={this.state.quant_product} onChange={this.salvaAlteracao.bind(this, 'quant_product')} placeholder="Quantidade" />
                        <button className="btn btn-default" type="submit" disabled={this.state.id_product && this.state.quant_product ? "" : "disabled"}>Adicionar</button>
                    </div>
                </form>
                <br />
                <div>
                    <h4>Lista de compras</h4>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Qtd</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders}
                        </tbody>
                    </table>
                    <button className="btn btn-default" type="button" onClick={this.sendForm}>Fechar pedido</button>
                </div>
            </div>
        )
    }
}