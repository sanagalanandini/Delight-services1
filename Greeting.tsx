import React from 'react';

// Define an interface for the component's props
interface GreetingProps {
  name: string;
}

// Functional Component
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!!</h1>;
};

export default Greeting;
