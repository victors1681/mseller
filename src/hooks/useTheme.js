import React, { useContext } from 'react';
import { ThemeContext } from 'react-native-elements';

const useTheme = () => {
  const { theme } = useContext(ThemeContext);
  return theme;
};

export default useTheme;
