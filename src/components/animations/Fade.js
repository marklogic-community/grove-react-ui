import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import './Fade.css';

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={props.timeout || 1000}
    classNames="ml-fade"
  >
    {children}
  </CSSTransition>
);

export default Fade;
