import React, { createContext, useState, useEffect } from "react"

// The SHGModel may not be available at this point, or might not be populated yet, so empty object
export const SHGStyleContext = createContext({})

export function SHGStyleContextProvider({ children }) {
  // This gets called when page loads or reloads,
  // or when something changes the model state, which calls updateModel()
  // **IF** in production mode, page reload is called.
  // Then context reinitializes accurately, but components dont redraw because React can't tell SHGModel changed.
  // So I add a timestamp to make sure the data changes enough to trigger rerender on subscribers
  const getSHGModel = () => {
    const newState = {
      timestamp: Date.now(),
      model: global.window?.__SHGModel || {},
    }
    return newState
  }

  // NOTE: every time that setSHGModel is called, useState is called right after that
  const [SHGModel, setSHGModel] = useState(getSHGModel())

  const updateModel = () => {
    setSHGModel(getSHGModel())
  }

  useEffect(() => {
    global.window.__SHGModel.modelStateChanged = updateModel
  })

  return (
    <SHGStyleContext.Provider value={{ SHGModel, updateModel }}>
      {children}
    </SHGStyleContext.Provider>
  )
}

/* this is for Gatsby to use to wrap the root element */
export const SHGStyleContextWrapper = ({ element }) => (
  <SHGStyleContextProvider>{element}</SHGStyleContextProvider>
)
