// src/components/ThemeSelector.tsx
import React from 'react';
import { useTheme } from './ThemeContext';
import styled from 'styled-components';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme, colorPalette, setColorPalette } = useTheme();

  return (
    <SelectorContainer>
      <label>
        Theme:
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label>
        Color Palette:
        <input
          type="color"
          value={colorPalette}
          onChange={(e) => setColorPalette(e.target.value)}
        />
      </label>
    </SelectorContainer>
  );
};

export default ThemeSelector;
export {};

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    margin: 10px 0;
  }

  select, input {
    margin-left: 10px;
  }
`;
