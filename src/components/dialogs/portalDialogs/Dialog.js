import React from 'react';
import './style.scss';

const DialogPortal = (props) => {
  return (
    <div className='dialog-wrapper'>
      <div className='dialog-backdrop'></div>
      <div className='dialog'>
        {props.children}
      </div>
    </div>
  )
}

const DialogHeader = (props) => {
  return (
    <div className='dialog-header'>
      {props.children}
    </div>
  )
}

const DialogBody = (props) => {
  return (
    <div className='dialog-body'>
      {props.children}
    </div>
  )
}

const DialogFooter = (props) => {
  return (
    <div className='dialog-footer'>
      {props.children}
    </div>
  )
}

export { DialogPortal, DialogHeader, DialogBody, DialogFooter}