import React, { Component } from 'react';
import FormLogin from './Login';

export default class Menu extends Component {

    render() {
        return (
            <div className="col-md-12">
                <h3> Bem vindo!</h3>
                <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-3">
                        <FormLogin />
                    </div>
                    <div className="col-md-5">
                    </div>
                </div>
            </div>
        );
    }
}