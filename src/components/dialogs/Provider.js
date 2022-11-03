import React, { createContext, useContext, useState } from 'react';
import './style.scss';

export const DialogContext = createContext();

const DialogProvider = (props) => {
  const [dialogs, setDialogs] = useState([]);

  const appendDialog = (dialog) => {
    setDialogs([...dialogs, dialog])
  }

  const closeDialog = () => {
    setDialogs([])
  };

  const closeCurrentDialog = (index) => {
    dialogs.splice(index, 1);
    setDialogs(dialogs)
  }

  const renderDialog = (dialog, index) => {
    return React.cloneElement(dialog, {
      close: () => {
        closeCurrentDialog(index);
      }
    })
  }

  return (
    <DialogContext.Provider value={{dialogs, appendDialog, closeDialog}}>
      {
        dialogs.map((dialog, index) => (
          <div key={index} className='dialog-wrapper'>
            <div className='dialog-backdrop' onClick={closeDialog}></div>
            {renderDialog(dialog, index)}
          </div>
        ))
      }
      {props.children}
    </DialogContext.Provider>
  )
}

const Dialog = (props) => {
  const { title, description, onClick} = props;
  const { closeDialog } = useContext(DialogContext);

  return (
    <div className='dialog'>
      <div className='dialog-header'>
        <span className='dialog-title'>{title}</span>
      </div> 
      <div className='dialog-body'>
        <p className='dialog-description'>{description}</p>
      </div>
      <div className='dialog-footer'>
        <button className='dialog-button' onClick={onClick}>Action</button>
        <button className='dialog-button' onClick={closeDialog}>Close</button>
      </div>
    </div>
  ) 
}

export { DialogProvider, Dialog};