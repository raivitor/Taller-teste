import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginBox from './components/LoginBox';
import CompanyBox from './components/CompanyBox';
import NewCompany from './components/NewCompany';
import DashboardBox from './components/DashboardBox';
import NewUser from './components/NewUser';
import NewOrderBox from './components/NewOrderBox';
import PrivateRoute from './security/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={LoginBox} />
                <Route exact path="/user/new" component={NewUser} />
                <PrivateRoute path="/dashboard" component={DashboardBox} />
                <PrivateRoute path="/company/new" component={NewCompany} />
                <PrivateRoute path="/company/:number" component={CompanyBox} />
                <PrivateRoute path="/order/new" component={NewOrderBox} />
            </Switch>
        </App>
    </Router>

), document.getElementById('root'));
registerServiceWorker();