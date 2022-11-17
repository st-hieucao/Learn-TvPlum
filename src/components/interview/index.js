import React, { useRef, useState } from 'react';
import axios from 'axios';

const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

export default function InterView() {
  const [value, setValue] = useState('');
  const [result, setResults] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const typingInput = useRef();

  const fetchData = async (value) => {
    if (value) {
      setIsLoading(true);
      const fakeData = [
        {
          name: 'Hieu'
        },
        {
          name: 'Huy'
        }
      ];
      const data = await axios.get(`${ITEMS_API_URL}?q=${value}`);
      // i'am dev in vscode and api block cors localhost, so i can read data from api. So i need fake data
      setResults(fakeData);
      setIsLoading(false);
    }
  }

  const handleChangeInput = (e) => {
    setResults(null);
    setValue(e.target?.value);
    if (typingInput.current) {
      clearTimeout(typingInput.current)
    }

    typingInput.current = setTimeout(() => {
      fetchData(e.target?.value || '')
    }, DEBOUNCE_DELAY)
  };

  const handleClickItem = (value) => {
    alert('selected: ', value);
  };

  return (
    <div className="wrapper">
      <div className="control">
        <input type="text" className="input" onChange={handleChangeInput} />
      </div>
      {
        (!isLoading && result) &&
        <div>
          {
            result.map(item => (
              <div className='item' onClick={() => handleClickItem(item)}>
                {item.name}
              </div>
            ))
          }
        </div>
      }
    </div>
  );
}
