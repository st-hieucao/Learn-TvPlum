import React, { createContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export const DialogPortalContext = createContext();

const PortalDialogs = (props) => {
  const [domReady, setDomReady] = useState(false);
  const rootRef = useRef(null);
  const [dialogs, setDialogs] = useState([]);
  console.log(dialogs)

  useEffect(() => {
    rootRef.current = document.getElementById('root');
    setDomReady(true);

    // return () => {
    //   setDialog(null);
    // }
  }, []);

  const appendDialogPortal = (dialog) => {
    setDialogs([...dialogs, dialog])
  }

  const closeDialogPortal = () => {
    setDialogs([]);
  }

  const renderDialogs = () => {
    dialogs.map((dialog) => {
      return ReactDOM.createPortal(dialog, rootRef.current)
    })
  }

  return (
    <DialogPortalContext.Provider value={{appendDialogPortal, closeDialogPortal}}>
      {domReady && dialogs.length > 0 && renderDialogs()}
      {props.children}
    </DialogPortalContext.Provider>
  )
}

export default PortalDialogs;

