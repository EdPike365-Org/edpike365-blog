import React, { createContext, useState, useEffect } from "react";

// For now the content will just hold the SHGModel useState()
// The SHGModel may not be available at this point, or might not be populated yet
export const SHGStyleContext = createContext({});

export function SHGStyleContextProvider({ children }) {

  // This gets called when page loads or reloads,
  // or when something changes the model state, which calls updateModel()
  // **IF** in production mode, page reload is called, context reinitializes accurately, but components dont redraw
  // I add a timestamp to make sure the data changes enough to trigger rerender on subscribers
  const getSHGModel = (msg) => {
    console.log("SHG_Context getSHGModel() getting with new timestamp. FROM " + msg)
    const newState = { timestamp: Date.now(), model: (global.window?.__SHGModel || {}) }
    return newState
  }

  // NOTE: every time that setSHGModel is called, useState is called right after that
  const [SHGModel, setSHGModel] = useState(getSHGModel("useState"));

  const updateModel = () =>{
    console.info("SHG_Context got a new Model update.")
   setSHGModel(getSHGModel("updateModel"))
  }

  useEffect(() => {
    console.log("SHG_Context useEffect being called")
    global.window.__SHGModel.modelStateChanged = updateModel
   // console.log("SHG_Context useEffect being called, about to call updateModel()")
   // updateModel()
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

