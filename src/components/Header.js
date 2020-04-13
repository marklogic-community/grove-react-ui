import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar } from './Navbar';

const brandLink = props => <Link to="/" {...props} />;
const Header = props => (
  <Navbar title="MarkLogic Grove" {...props} brandLink={brandLink}>
    <Nav>
      <LinkContainer exact to="/">
        <NavItem>Search</NavItem>
      </LinkContainer>
      <LinkContainer exact to="/create">
        <NavItem>Create</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

export default Header;
