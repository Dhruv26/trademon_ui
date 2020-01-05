import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar bg="light" variant="light" collapseOnSelect>
            <Navbar.Brand>
                <Link to="/">Trade Monitor</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-center">
                    <NavItem>
                        <Link to="/" className="nav-link" role="button">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/add" className="nav-link" role="button">Add New Entry</Link>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;