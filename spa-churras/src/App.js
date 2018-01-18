import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './fonts/glyphicons-halflings-regular.eot';
import LoginBox from './components/LoginBox';
import Menu from './components/Menu';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Menu />
        </div>
        <div className="row">
          <LoginBox />
        </div>
      </div>
    );
  }
}

export default App;
