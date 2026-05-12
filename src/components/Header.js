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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import ClassNotesLogo from '../assets/ClassNotesLogo.png';

const Header = () => {
  const { isAuthenticated, handleLogout } = useAuthentication();
  console.log('header is now authenticated:', isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {isAuthenticated ? (
        <Navbar className="navbar navbar-expand-md navbar-dark">
          <NavbarBrand tag={Link} to="/account">
            ClassNotes
            <FontAwesomeIcon icon={faMusic} className="me-2" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <Link to='/login' onClick={handleLogout}>Logout</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      ) : (
        <Navbar className="navbar navbar-expand-md navbar-dark">
          <NavbarBrand tag={Link} to="/">
            ClassNotes
            <img
              src={ClassNotesLogo}
              alt="ClassNotes logo"
              style={{
                width: '100px',
                borderRadius: '8px',
                marginRight: '0px',
                verticalAlign: 'middle'
              }}
            />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem className="me-3">
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

