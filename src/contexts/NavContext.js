import React, { createContext, useState } from "react"

export const NavContext = createContext({
    showNav: false,
    toggleShowNav: () => {},
})

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