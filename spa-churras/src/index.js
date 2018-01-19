import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginBox from './components/LoginBox';
import CompanyBox from './components/CompanyBox';
import NewCompany from './components/NewCompany';
import DashboardBox from './components/DashboardBox';
import PrivateRoute from './security/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={LoginBox} />
                <PrivateRoute path="/dashboard" component={DashboardBox} />
                <PrivateRoute path="/company/new" component={NewCompany} />
                <PrivateRoute path="/company/:number" component={CompanyBox} />
            </Switch>
        </App>
    </Router>

), document.getElementById('root'));
registerServiceWorker();