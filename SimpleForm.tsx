import React, { useState } from 'react';

interface FormState {
  inputValue: string;
}

const SimpleForm: React.FC = () => {
  
  const [formState, setFormState] = useState<FormState>({ inputValue: '' });
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);

 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState({ inputValue: event.target.value });
  };

  
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setSubmittedValue(formState.inputValue); // Display submitted value
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <form onSubmit={handleSubmit}>
        <label>
          Enter something:
          <input
            type="text"
            value={formState.inputValue}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '10px', padding: '5px 10px' }}>Submit</button>
      </form>
      
      {submittedValue && (
        <p style={{ marginTop: '20px' }}>Submitted Value: {submittedValue}</p>
      )}
    </div>
  );
};

export default SimpleForm;
