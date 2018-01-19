import React, { Component } from 'react';

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
                </div>
                <span className="error">{this.state.msgErro}</span>
            </div>
        );
    }
}