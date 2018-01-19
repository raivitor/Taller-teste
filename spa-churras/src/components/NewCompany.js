import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import CustomInput from './CustomInput';
import TratadorErros from './TratadorErros';

export default class NewCompany extends Component {
    constructor() {
        super();
        this.state = { company_name: "", company_cnpj: "" }
        this.enviaForm = this.enviaForm.bind(this);
    }

    enviaForm(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/company/',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ company_name: this.state.company_name, company_cnpj: this.state.company_cnpj }),
            success: function (company) {
                this.setState({ company_name: "", company_cnpj: "" })
            }.bind(this),
            error: function (err) {
                console.log(err)
                if (err.status === 400) {
                    new TratadorErros().publicaErros(err.responseJSON);
                }
            },
            beforeSend: function () {
                PubSub.publish("limpa-erros", {});
            }
        });
    }

    salvaAlteracao(nomeInput, evento) {
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;
        this.setState(campoSendoAlterado);
    }

    render() {
        return (
            <div className="col-md-12">
                <h3>Dashboard</h3>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <form className="form-horizontal" onSubmit={this.enviaForm}>
                            <CustomInput id="company_name" type="text" name="company_name" value={this.state.company_name} onChange={this.salvaAlteracao.bind(this, 'company_name')} label="Nome Fantasia" />
                            <CustomInput id="company_cnpj" type="text" name="company_cnpj" value={this.state.company_cnpj} onChange={this.salvaAlteracao.bind(this, 'company_cnpj')} label="CNPJ" />
                            <div className="form-group">
                                <div className="col-sm-12">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">Cadastrar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}