import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar as MLNavbar } from 'muir-react';

const Navbar = props => (
  <MLNavbar title="MarkLogic UI Toolkit">
    <Nav>
      <LinkContainer exact to='/'>
        <NavItem>Search</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer exact to='/login'>
        <NavItem>Login</NavItem>
      </LinkContainer>
    </Nav>
  </MLNavbar>
);

export default Navbar;
