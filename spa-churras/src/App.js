import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './css/CustomStyle.css';
import './fonts/glyphicons-halflings-regular.eot';
import Menu from './components/Menu';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Menu />
        </div>
        <div className="row">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
