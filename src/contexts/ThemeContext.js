import React, { useState, useEffect, useContext } from "react";

// For now the content will just hold the SHGModel useState()
// The SHGModel may not be available at this point, or might not be populated yet
const ThemeContext = React.createContext({});

export function ThemeProvider({ children }) {
  
  const [SHGModel, setSHGModel] = useState(global.window?.__SHGModel || {});

  useEffect(() => {
    global.window?.__SHGModel.modelStateChanged = setSHGModel;
  }, []);

  return (
    <ThemeContext.Provider value={{ SHGModel, setSHGModel }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);