import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../security/Auth';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Menu extends Component {

    render() {
        return (
            <div className="col-md-8 center">
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link className="navbar-brand" to="/dashboard">Churras Garantido!</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />   
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem>
                                <Link to='/dashboard' >Dashboard</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/company/new' >Cadastrar nova empresa</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/order/new' >Novo pedido</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/account/edit' >Minha conta</Link>
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem >
                                <Link to='/' onClick={() => Auth.logout()}>LOGOUT</Link>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}