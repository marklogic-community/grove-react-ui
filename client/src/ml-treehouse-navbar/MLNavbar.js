import React from 'react';
import { Grid, Navbar } from 'react-bootstrap';

const MLNavbar = (props) => {
  return (
    <Navbar>
      <Grid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">{props.title}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Grid>
    </Navbar>
  );
};

export default MLNavbar;
