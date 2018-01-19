import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class CustomInput extends Component {

    constructor() {
        super();
        this.state = { msgErro: '' };
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id} className="col-sm-2 control-label">{this.props.label}</label>
                <div className="col-sm-10">
                    <input type={this.props.type}
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        className="form-control"
                        id={this.props.id} />
                    <span id={this.props.id} className="help-block">{this.state.msgErro}</span>
                </div>
                
            </div>
        );
    }

    componentDidMount() {
        PubSub.subscribe("erro-validacao", function (topico, erro) {
            if (erro.param === this.props.name) {
                this.setState({ msgErro: erro.msg });
            }
        }.bind(this));

        PubSub.subscribe("limpa-erros", function (topico) {
            this.setState({ msgErro: '' });
        }.bind(this));
    }
}