import React from 'react';
import './style.scss';

const Avatar = (props) => {
  const { src } = props;
  
  return (
    <div className='avatar'>
      <img src={src} alt="avatar" />
    </div>
  )
}

export default Avatar;