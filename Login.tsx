// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from './ThemeContext';
import ThemeSelector from './ThemeSelector';

// Define the User type
interface User {
  username: string;
  password: string;
  role: string;
}

const users: User[] = [
  { username: "Admin", password: "johndoe@123", role: "Admin" },
  { username: "Nick", password: "123", role: "User" },
  { username: "Guest", password: "guest@123", role: "Guest" },
];

const Login: React.FC = () => {
  const { theme, colorPalette } = useTheme();
  const [state, setState] = useState<{ username: string; password: string; error: string }>({ username: '', password: '', error: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = users.find((u: User) => u.username === state.username && u.password === state.password);
    
    if (user) {
      navigate(`/${user.role.toLowerCase()}`); // Redirect based on role
    } else {
      setState((prevState) => ({ ...prevState, error: 'Invalid username or password' }));
      setTimeout(() => setState((prev) => ({ ...prev, error: '' })), 3000); // Clear error after 3 seconds
    }
  };

  return (
    <Container theme={theme} colorPalette={colorPalette}>
      <ThemeSelector />
      <LoginForm theme={theme} onSubmit={handleSubmit}>
        <Title theme={theme}>Login</Title>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={state.username}
          onChange={handleChange}
          required
          colorPalette={colorPalette}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required
          colorPalette={colorPalette}
        />
        <Button type="submit" colorPalette={colorPalette}>Login</Button>
        {state.error && <Error>{state.error}</Error>}
      </LoginForm>
    </Container>
  );
};

export default Login;

// Styled components with proper props
const Container = styled.div<{ theme: string; colorPalette: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => (theme === 'dark' ? '#333' : '#f0f0f0')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const LoginForm = styled.form<{ theme: string }>`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#555' : '#fff')};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2<{ theme: string }>`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
`;

const Input = styled.input<{ colorPalette: string }>`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: ${({ colorPalette }) => colorPalette};
    outline: none;
  }
`;

const Button = styled.button<{ colorPalette: string }>`
  padding: 10px;
  font-size: 16px;
  background-color: ${({ colorPalette }) => colorPalette};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ colorPalette }) => colorPalette + 'CC'}; // Slightly darker
  }
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;
