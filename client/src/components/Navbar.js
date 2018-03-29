import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar as MLNavbar } from 'muir-react';

const Navbar = props => (
  <MLNavbar title="MarkLogic UI Toolkit">
    <Nav>
      <LinkContainer exact to="/">
        <NavItem>Search</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer exact to="/login">
        <NavItem>Login</NavItem>
      </LinkContainer>
      <NavItem
        onClick={(e) => {
          e.preventDefault();
          return fetch(new URL('/api/user/logout', document.baseURI).toString(), {
            method: 'GET',
            credentials: 'same-origin'
          });
        }}
      >
        Logout
      </NavItem>
    </Nav>
  </MLNavbar>
);

export default Navbar;
