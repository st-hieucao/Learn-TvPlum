import React, { useEffect, useState } from 'react';
import './style.scss';

const optionsRadio = [
  {
    value: 1,
    text: 'Male',
  }, {
    value: 2,
    text: 'Female',
  },
  {
    value: 3,
    text: 'Other'
  }
]

const Radio = (props) => {
  const { options = optionsRadio, defaultValue, onChange } = props;
  const [selectValue, setSelectValue] = useState(null);

  const onChangeRadio = (value) => {
    setSelectValue(value)
  };

  useEffect(() => {
    if (defaultValue && !selectValue) {
      setSelectValue(defaultValue);
    }
  }, [selectValue]);

  useEffect(() => {
    onChange(selectValue);
  }, [selectValue])

  return (
    <div className='input-radio'>
      {
        options && options.map(option => (
          <label
            className='input-radio-label'
            htmlFor={`radio-custom-${option.value}`} key={option.value}
          >
            <input checked={selectValue === option.value} hidden type='checkbox' id={`radio-custom-${option.value}`} value={option.value} onChange={() => onChangeRadio(option.value)} />
            <div className='input-radio' />
            {option?.text && <span>{option.text}</span>}
          </label>
        ))
      }
    </div>
  )
}

export default Radio;
