import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';

//TODO: keep it active.
const brandLink = props => <Link to="/" {...props} />;
const Header = props => (
  <Navbar title="MarkLogic Grove" {...props} brandLink={brandLink}>
    <Nav>
      <Nav.Item as="li">
        <Nav.Link exact="true" href="/">
          Search
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link exact="true" href="/create">
          Create
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </Navbar>
);

export default Header;
