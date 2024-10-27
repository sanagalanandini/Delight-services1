import React, { useState } from 'react';

// Define the type for the component's state
interface ToggleState {
  isVisible: boolean;
}

const ToggleText: React.FC = () => {
  // Initialize state with a default value of false for `isVisible`
  const [state, setState] = useState<ToggleState>({ isVisible: false });

  // Event handler to toggle visibility
  const toggleVisibility = (): void => {
    setState((prevState) => ({ isVisible: !prevState.isVisible }));
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <button onClick={toggleVisibility} style={{ padding: '5px 10px', marginBottom: '10px' }}>
        {state.isVisible ? 'Hide' : 'Show'} Text
      </button>

      {state.isVisible && (
        <p>This is a paragraph of text that can be shown or hidden.</p>
      )}
    </div>
  );
};

export default ToggleText;
