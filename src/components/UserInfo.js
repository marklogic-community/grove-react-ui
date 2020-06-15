import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';

export const UserInfo = ({
  isAuthenticated,
  currentUsername,
  submitLogout,
  loginPath
}) => (
  <div>
    {isAuthenticated ? (
      <Nav className="justify-content-end">
        <Nav.Item>
          <Nav.Link eventKey="disabled" className="userInfo">
            <i className="fa fa-user"></i> {currentUsername}
          </Nav.Link>
        </Nav.Item>
        <Nav.Link
          onClick={e => {
            e.preventDefault();
            submitLogout(currentUsername);
          }}
        >
          Logout
        </Nav.Link>
      </Nav>
    ) : (
      <Nav className="justify-content-end">
        <Nav.Item>
          <Nav.Link href={loginPath || '/login'}>Login</Nav.Link>
        </Nav.Item>
      </Nav>
    )}
  </div>
);

UserInfo.propTypes = {
  isAuthenticated: PropTypes.bool,
  currentUsername: PropTypes.string,
  submitLogout: PropTypes.func,
  loginPath: PropTypes.string
};
