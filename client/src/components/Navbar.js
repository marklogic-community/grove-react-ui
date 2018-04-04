import React from 'react';
import { Nav, NavItem, Navbar as BSNavbar, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar as MLNavbar } from 'muir-react';

const Navbar = ({ isAuthenticated, currentUser, submitLogout }) => (
  <MLNavbar title="MarkLogic UI Toolkit">
    <Nav>
      <LinkContainer exact to="/">
        <NavItem>Search</NavItem>
      </LinkContainer>
    </Nav>
    {isAuthenticated ? (
      <div className="pull-right">
        <BSNavbar.Text>
          <Glyphicon glyph="user" /> {currentUser}
        </BSNavbar.Text>
        <Nav>
          <NavItem
            onClick={e => {
              e.preventDefault();
              submitLogout(currentUser.username);
            }}
          >
            Logout
          </NavItem>
        </Nav>
      </div>
    ) : (
      <Nav pullRight>
        <LinkContainer exact to="/login">
          <NavItem>Login</NavItem>
        </LinkContainer>
      </Nav>
    )}
  </MLNavbar>
);

export default Navbar;
