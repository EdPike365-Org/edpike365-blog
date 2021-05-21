import React, { createContext, useState } from "react"

export const NavContext = createContext({
    showNav: false,
    toggleShowNav: () => {},
})

// multiple states in one context https://stackoverflow.com/questions/60866924/how-to-pass-multiple-states-through-react-context-api
export const NavContextProvider = (props) => {

  // context actually holds a "state", confusing as heck
  const  [showNav, setShowNav] = useState(false)

  const toggleShowNav = () => {
    setShowNav( !showNav )
  }

  return (
    <NavContext.Provider value={{ showNav, toggleShowNav}}>
      {props.children}
    </NavContext.Provider>
  )

}