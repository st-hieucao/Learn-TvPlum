import classNames from 'classnames';
import React, { createContext, useContext, useEffect, useState } from 'react';
import './style.scss';

const DropdownContext = createContext();

const Dropdown = (props) => {
  const { options, defaultValue, value, onChange } = props;
  const [selectValue, setSelectValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onChange(selectValue?.value);
  }, [selectValue]);

  const handleSelect = (value) => {
    setSelectValue(value);
    closeDropdown();
  }

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const closeDropdown = () => {
    setOpen(false)
  }

  return (
    <DropdownContext.Provider value={{selectValue, open, toggleDropdown}}>
      <div className='dropdown'>
        {props.children}
        <ul className={classNames('dropdown-list',
          open && 'open'
        )}>
          {
            options.map(item => (
              <li 
                key={item.value} 
                className={classNames('dropdown-item', value === item.value && 'active')} 
                onClick={() => handleSelect(item)}
              >
                {item.text}
              </li>
            ))
          }
        </ul>
        {
          open &&
          <div className='dropdown-backdrop' onClick={closeDropdown}>
          </div>
        }
      </div>
    </DropdownContext.Provider>
  )
}

const DropdownButton = (props) => {
  const { selectValue, toggleDropdown } = useContext(DropdownContext);

  return (
    <button className='dropdown-button' onClick={toggleDropdown}>{selectValue?.text || props.children}</button>
  )
}

export { Dropdown, DropdownButton };
