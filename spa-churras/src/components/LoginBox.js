import React, { Component } from 'react';
import LoginForm from './LoginForm';

export default class LoginBox extends Component {

    render() {
        return (
            <div className="col-md-12">
                <h3> Bem vindo!</h3>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <LoginForm />
                    </div>
                </div>
            </div>
        );
    }
}