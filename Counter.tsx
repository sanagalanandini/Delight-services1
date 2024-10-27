import React, { useState } from 'react';

// Define the type for the component's state
interface CounterState {
  count: number;
}

const Counter: React.FC = () => {
  // Define the state with a type annotation for the counter
  const [state, setState] = useState<CounterState>({ count: 0 });

  // Event handler for incrementing the count
  const increment = (): void => {
    setState((prevState) => ({ count: prevState.count + 1 }));
  };

  // Event handler for decrementing the count
  const decrement = (): void => {
    setState((prevState) => ({ count: prevState.count - 1 }));
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Counter: {state.count}</h1>
      <button onClick={increment} style={{ marginRight: '10px' }}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
