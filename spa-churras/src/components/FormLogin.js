import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import CustomInput from './CustomInput';
import { Redirect, Link } from 'react-router-dom';
import TratadorErros from './TratadorErros';
import Auth from '../security/Auth';

export default class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "rai@gmail", password: "123", redirect: false }
        this.enviaForm = this.enviaForm.bind(this);
        Auth.logout();
    }

    enviaForm(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/user/login',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ email: this.state.email, password: this.state.password }),
            success: function (novaListagem) {
                Auth.authenticate();
                this.setState({redirect: true})
            }.bind(this),
            error: function (err) {
                if (err.status === 400) new TratadorErros().publicaErros(err.responseJSON)
                else console.log('error: ' + err);
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
            <form className="form-horizontal" onSubmit={this.enviaForm}>
                <CustomInput id="email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this, 'email')} label="Email" />
                <CustomInput id="password" type="password" name="password" value={this.state.password} onChange={this.salvaAlteracao.bind(this, 'password')} label="Password" />
                <div className="form-group">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Entrar</button>
                    </div>
                </div>
                <div className="col-sm-10">
                    <Link to='/user/new'><button type="submit" className="btn btn-primary btn-lg btn-block">Cadastrar</button></Link>
                </div>
                {this.state.redirect && ( <Redirect to='./dashboard' /> )}
            </form>
        )
    }
}