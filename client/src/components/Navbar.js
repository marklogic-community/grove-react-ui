import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { Navbar as MLNavbar } from 'muir-react';

const Navbar = props => <MLNavbar title="MarkLogic UI Toolkit" content={
  <Nav pullRight>
    <NavItem>Login</NavItem>
  </Nav>
} />;

export default Navbar;
