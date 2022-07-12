import React from 'react'
import { Dialog } from '../Provider';

const ErrorDialog = (props) => {
  const { onClick } = props;

  return (
    <Dialog title='Error' description='Error description' onClick={onClick}>
      <Dialog.Header className=''>
        <span>Title popup error</span>
      </Dialog.Header>
      <Dialog.Body className=''>
        <p>Title popup error</p>
      </Dialog.Body>
      <Dialog.Footer className=''>
        <button>
          Action
        </button>
      </Dialog.Footer>
    </Dialog>
  )
}

export default ErrorDialog;
