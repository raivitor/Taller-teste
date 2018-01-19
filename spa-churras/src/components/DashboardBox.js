import React, { Component } from 'react';
import DashboardTable from './DashboardTable';

export default class DashboardBox extends Component {

    render() {
        return (
            <div className="col-md-12">
                <h3>Dashboard</h3>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <DashboardTable />
                    </div>
                </div>
            </div>
        );
    }
}