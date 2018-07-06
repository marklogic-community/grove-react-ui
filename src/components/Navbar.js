import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar as MLNavbar } from 'muir-core-react-components';

const Navbar = props => (
  <MLNavbar title="MarkLogic UI Resources" {...props}>
    <Nav>
      <LinkContainer exact to="/">
        <NavItem>Search</NavItem>
      </LinkContainer>
    </Nav>
  </MLNavbar>
);

export default Navbar;
