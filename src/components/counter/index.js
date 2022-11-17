import React, { useEffect, useState } from 'react';

const As = React.memo((props) => {
  console.log('render')
  return (
    <>Use Memo</>
  )
});

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.addEventListener('click', () => {
      console.log('click')
    });

    return () => {
      window.addEventListener('click', () => {});
    }
  }, []);

  const handleIncrease = () => {
    setCount((count) => count + 1);
  };

  return (
    <div>
      <span>Counter: {count}</span>
      <button onClick={handleIncrease}>Increase</button>
      <As o={handleIncrease} />
    </div>
  );
};

export default Counter;
