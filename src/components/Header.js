import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import useAuthentication from './Authentication';

const Header = () => {
  const { isAuthenticated, handleLogout } = useAuthentication();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {isAuthenticated ? (
        <Navbar className="navbar navbar-expand-md navbar-dark">
          <NavbarBrand href="account">ClassNotes</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <Link to='/login' onClick={handleLogout}>Logout</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      ) : (
        <Navbar className="navbar navbar-expand-md navbar-dark">
          <NavbarBrand href="/">ClassNotes</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <Link to="/login">Login</Link>
              </NavItem>
              <NavItem>
                <Link to="/register">Register</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </div>
  );  
}

export default Header;

