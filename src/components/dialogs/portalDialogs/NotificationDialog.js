import React, { useContext } from 'react'
import { DialogPortalContext } from '../PortalDialogs'
import ErrorDialog from '../template/ErrorDialog';
import { DialogBody, DialogFooter, DialogHeader, DialogPortal } from './Dialog'

const NotificationDialog = (props) => {
  const { appendDialogPortal } = useContext(DialogPortalContext);
  const handleAction = () => {
    console.log('dchasbcds')
    appendDialogPortal(<ErrorDialog onClick={() => alert('click')} />)
  }
  return (
    <DialogPortal>
      <DialogHeader>
        <span className='title'>Notification title</span>
      </DialogHeader>
      <DialogBody>
        <span className='description'>Notification description</span>
      </DialogBody>
      <DialogFooter>
        <span className='action' onClick={handleAction}>Notification actions</span>
      </DialogFooter>
    </DialogPortal>
  )
}

export default NotificationDialog