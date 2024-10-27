import React from 'react';
interface HelloWorldProps {}
interface HelloWorldState {
  message: string;
}

const HelloWorld: React.FC<HelloWorldProps> = () => {
  
  const [state, setState] = React.useState<HelloWorldState>({
    message: "Hello, World!",
  });

  return <h1>{state.message}</h1>;
};

export default HelloWorld;
