import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import CustomInput from '../util/CustomInput';
import TratadorErros from '../util/TratadorErros';
import { Redirect } from 'react-router-dom';

export default class NewUser extends Component {
    constructor() {
        super();
        this.state = { email: "", password: "", passwordConfirm: "", error: "", redirect: false }
        this.enviarForm = this.enviarForm.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm(e){
        e.preventDefault();
        PubSub.publish("limpa-erros", {});
        if(this.state.password === this.state.passwordConfirm) {
            this.setState({ error: "" })
            this.enviarForm();
        }
        else this.setState({error: "Senhas difentes"})
    }

    enviarForm() {
        $.ajax({
            url: 'http://localhost:3000/user/',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ email: this.state.email, password: this.state.password }),
            success: function (user) {
                this.setState({ email: "", password: "", passwordConfirm: "", redirect: true })
            }.bind(this),
            error: function (err) {
                if (err.status === 400) new TratadorErros().publicaErros(err.responseJSON)
                else console.log('error: ' + err);
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
                <h3>Novo usuário</h3>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <form className="form-horizontal" onSubmit={this.validateForm}>
                            <h4 className="help-block text-center">{this.state.error}</h4>
                            <CustomInput id="email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this, 'email')} label="Email" />
                            <CustomInput id="password" type="password" name="password" value={this.state.password} onChange={this.salvaAlteracao.bind(this, 'password')} label="Senha" />
                            <CustomInput id="passwordConfirm" type="password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.salvaAlteracao.bind(this, 'passwordConfirm')} label="Confirmar senha" />
                            <div className="form-group">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">Cadastrar</button>
                                </div>
                            </div>
                        </form>
                        {this.state.redirect && (<Redirect to='/' />)}
                    </div>
                </div>
            </div>
        );
    }
}