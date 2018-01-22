import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import CustomInput from '../util/CustomInput';
import TratadorErros from '../util/TratadorErros';
import Auth from '../security/Auth';

export default class AccountEdit extends Component {
    constructor() {
        super();
        this.state = { email: Auth.getEmail(), password: "", passwordConfirm: "", msg: "", redirect: false }
        this.sendForm = this.sendForm.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm(e) {
        e.preventDefault();
        PubSub.publish("limpa-erros", {});
        if (this.state.password === this.state.passwordConfirm) {
            this.setState({ msg: "" })
            this.sendForm();
        }
        else this.setState({ msg: "Senhas difentes" })
    }

    sendForm() {
        $.ajax({
            url: 'http://localhost:3000/user/',
            contentType: 'application/json',
            dataType: 'json',
            type: 'put',
            data: JSON.stringify({ id_user: Auth.getId(), email: this.state.email, password: this.state.password }),
            success: function (user) {
                this.setState({ email: this.state.email, password: "", passwordConfirm: "", redirect: true, msg: "Conta atualizada!" })
            }.bind(this),
            error: function (err) {
                if (err.status === 400) new TratadorErros().publicaErros(err.responseJSON)
                else console.log('error: ' + err);
            }
        });
    }

    saveOnChange(inputName, event) {
        var fieldChange = {};
        fieldChange[inputName] = event.target.value;
        this.setState(fieldChange);
    }

    render() {
        return (
            <div className="col-md-12">
                <h3>Editando sua conta</h3>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <form className="form-horizontal" onSubmit={this.validateForm}>
                            <h4 className="help-block text-center">{this.state.msg}</h4>
                            <CustomInput id="email" type="email" name="email" value={this.state.email} onChange={this.saveOnChange.bind(this, 'email')} label="Email" />
                            <CustomInput id="password" type="password" name="password" value={this.state.password} onChange={this.saveOnChange.bind(this, 'password')} label="Senha" />
                            <CustomInput id="passwordConfirm" type="password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.saveOnChange.bind(this, 'passwordConfirm')} label="Confirmar senha" />
                            <div className="form-group">
                                <div className="col-sm-10">
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