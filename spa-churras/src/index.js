import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginBox from './components/LoginBox';
import DashboardBox from './components/DashboardBox';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={LoginBox} />
                <Route path="/dashboard" component={DashboardBox} />
            </Switch>
        </App>
    </Router>

), document.getElementById('root'));
registerServiceWorker();