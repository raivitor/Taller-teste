import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './fonts/glyphicons-halflings-regular.eot';


class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#">Churras Garantido!</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li>
                      <a href="#">Dashboard</a>
                    </li>
                    <li>
                      <a href="#">Cadastrar nova empresa</a>
                    </li>
                    <li>
                      <a href="#">Novo pedido</a>
                    </li>
                    <li>
                      <a href="#">Minha conta</a>
                    </li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <a href="#">Sair</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3>
              Bem vindos!
            </h3>
            <div className="row">
              <div className="col-md-4">
              </div>
              <div className="col-md-3">
                <form className="form-horizontal">
                  <div className="form-group">
                    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-10">
                      <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-12">
                      <button type="submit" className="btn btn-primary btn-lg btn-block">Entrar</button>
                    </div><br /><br />
                    <div className="col-sm-12">
                      <button type="submit" className="btn btn-primary btn-lg btn-block">Cadastrar</button>
                    </div>
                  </div>
                  
                </form>
              </div>
              <div className="col-md-5">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
