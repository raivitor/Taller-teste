import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './fonts/glyphicons-halflings-regular.eot';


class App extends Component {
  render() {
    return (
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Churras Garantido!</a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Cadastrar nova empresa</a></li>
              <li><a href="#">Novo pedido</a></li>
              <li><a href="#">Minha conta</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#">Sair</a></li>
            </ul>
          </div>
        </div>
      </nav>
      
    );
  }
}

export default App;
