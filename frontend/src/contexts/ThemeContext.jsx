import React, { createContext, useContext } from 'react';
import { useTheme } from '../hooks/useTheme';

// Create context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * Theme provider component that manages dark/light mode 
 */
export const ThemeProvider = ({ children }) => {
  const themeValue = useTheme();
  
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use the theme context
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}; 