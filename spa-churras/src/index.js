import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginBox from './components/LoginBox';
import DashboardBox from './components/DashboardBox';
import CompanyBox from './components/CompanyBox';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import NewCompany from './components/NewCompany';

ReactDOM.render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={LoginBox} />
                <Route path="/dashboard" component={DashboardBox} />
                <Route path="/company/new" component={NewCompany} />
                <Route path="/company/:number" component={CompanyBox} />
            </Switch>
        </App>
    </Router>

), document.getElementById('root'));
registerServiceWorker();