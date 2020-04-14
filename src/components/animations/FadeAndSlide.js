import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import './FadeAndSlide.css';

const FadeAndSlide = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={props.timeout || 1000}
    classNames="ml-fade-slide"
  >
    {children}
  </CSSTransition>
);

export default FadeAndSlide;
