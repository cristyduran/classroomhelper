import React, { useState } from 'react';
import { useAuthentication } from './AuthenticationContext';
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

const Header = () => {
  const { isAuthenticated, handleLogout } = useAuthentication();
  console.log('header is now authenticated:', isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {isAuthenticated ? (
        <Navbar className="navbar navbar-expand-md navbar-dark">
          <NavbarBrand tag={Link} to="/account">ClassNotes</NavbarBrand>
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
          <NavbarBrand tag={Link} to="/">ClassNotes</NavbarBrand>
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

