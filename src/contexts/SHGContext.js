import React, { createContext, useState, useEffect } from "react";

// For now the content will just hold the SHGModel useState()
// The SHGModel may not be available at this point, or might not be populated yet
export const SHGStyleContext = createContext({});

export function SHGStyleContextProvider({ children }) {
  
  const [SHGModel, setSHGModel] = useState(global.window?.__SHGModel || {});

  const updateModel = (newModel) =>{
    console.info("SHGStyleContext got a new Model update.");
    setSHGModel(newModel);
  }

  useEffect(() => {
    global.window.__SHGModel.modelStateChanged = updateModel;
  }, []);

  return (
    <SHGStyleContext.Provider value={{ SHGModel, updateModel }}>
      {children}
    </SHGStyleContext.Provider>
  );
}

//export const useTheme = () => useContext(ThemeContext);

/* this is for Gatsby to use to wrap the root element */
export const SHGStyleContextWrapper = ({ element }) => (
  <SHGStyleContextProvider>
    {element}
  </SHGStyleContextProvider>
)

