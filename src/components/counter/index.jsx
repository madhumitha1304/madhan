import { useState } from 'react';
import './index.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => Math.max(0, prev - 1));

  return (
    <div className="counter-container glass-panel">
      <h3 className="counter-title">Interactive <span className="title-gradient">Counter</span></h3>
      <div className="counter-display">
        {count}
      </div>
      <div className="counter-actions">
        <button className="btn-secondary counter-btn" onClick={decrement}>-</button>
        <button className="btn-primary counter-btn" onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default Counter;
