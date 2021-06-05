import React, { createContext, useState, useEffect } from "react";

// For now the content will just hold the SHGModel useState()
// The SHGModel may not be available at this point, or might not be populated yet
export const SHGStyleContext = createContext({});

// I add a timestamp to make sure the data changes enough to trigger rerender on subscribers
const getSHGModel = () => {
  return { timestamp: Date.now(), model: (global.window?.__SHGModel || {}) }
}

export function SHGStyleContextProvider({ children }) {
  
  const [SHGModel, setSHGModel] = useState(getSHGModel());

  const updateModel = (newModel) =>{
    console.info("SHGStyleContext got a new Model update.");
    setSHGModel( getSHGModel() );
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

/* this is for Gatsby to use to wrap the root element */
export const SHGStyleContextWrapper = ({ element }) => (
  <SHGStyleContextProvider>
    {element}
  </SHGStyleContextProvider>
)

