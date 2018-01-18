import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from './CustomInput';


export default class FormLogin extends Component {
    constructor(){
        super();
        this.state = {email: "", password: ""}
        this.enviaForm = this.enviaForm.bind(this);
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
                console.log(novaListagem)
               // PubSub.publish('atualiza-lista-autores', novaListagem);
               this.setState({ nome: '', email: '', senha: '' });
            }.bind(this),
            error: function (resposta) {
                console.log(resposta)
              /*  if (resposta.status === 400) {
                    new TratadorErros().publicaErros(resposta.responseJSON);
                }*/
            },
            beforeSend: function () {
               // PubSub.publish("limpa-erros", {});
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
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Entrar</button>
                    </div><br /><br />
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Cadastrar</button>
                    </div>
                </div>
            </form>
        )
    }

}