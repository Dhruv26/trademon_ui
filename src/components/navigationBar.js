import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar expand="lg">
            <Navbar.Brand href="/">Trade Monitor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link>
                            <Link to="/">Home</Link>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            <Link to="/add">Add New Entry</Link>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;