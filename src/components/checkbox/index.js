import React, { useEffect, useState } from 'react';
import './style.scss';

const CheckBox = (props) => {
  const { value, text, onChange } = props;
  const [isCheck, setIsCheck] = useState(false);

  const toogleCheck = () => {
    setIsCheck(!isCheck);
  };

  useEffect(() => {
    onChange(isCheck);
  }, [isCheck]);

  return (
    <div className='input-checkbox'>
      <label
        className='input-checkbox-label'
        htmlFor={`checkbox-custom-${value}`}
      >
        <input checked={isCheck} hidden type='checkbox' id={`checkbox-custom-${value}`} value={value} onChange={toogleCheck} />
        <div className='input-checkbox' />
        <span>{text}</span>
      </label>
    </div>
  )
}

export default CheckBox;
