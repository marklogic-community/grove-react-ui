import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar as MLNavbar } from 'muir-core-react-components';

const brandLink = props => <Link to="/" {...props} />;
const Navbar = props => (
  <MLNavbar title="MarkLogic UI Resources" {...props} brandLink={brandLink}>
    <Nav>
      <LinkContainer exact to="/">
        <NavItem>Search</NavItem>
      </LinkContainer>
    </Nav>
  </MLNavbar>
);

export default Navbar;
