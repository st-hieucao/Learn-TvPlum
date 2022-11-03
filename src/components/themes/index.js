import React, { useEffect, useState } from 'react';
import * as themes from '../../themes.json';

export const ThemeContext = React.createContext('light');

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState('dark');

  // useEffect(() => {
  //   const defaultTheme = themes.default[theme].colors;
  //   Object.keys(defaultTheme).map((key) => {
  //     const cssKey = `--${key}`;
  //     document.body.style.setProperty(cssKey, defaultTheme[key]);
  //   })
  // }, [theme]);


  const handleChangeTheme = (theme) => {
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{theme, handleChangeTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}
