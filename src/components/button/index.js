import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';
import classNames from 'classnames';

const Button = (props) => {
  const  { variant, className, color, children } = props;

  return (
    <button className={classNames('btn', className, color)}>{children}</button>
  )
}

Button.propTypes = {
  variant: 'text' | 'contained' | 'outline' | 'outline-border',
  className: PropTypes.string,
  color: 'primary' | 'danger' | 'outline',
  children: PropTypes.string,
}

export default Button;
