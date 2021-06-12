import React, { createContext, useState, useEffect } from "react"
import { isSSR } from "../utils/HelperFunctions"

export const NavContext = createContext({
  showNav: false,
  toggleShowNav: () => {},
})

// multiple states in one context 
export const NavContextProvider = (element) => {
  const [showNav, setShowNav] = useState(false)
  const toggleShowNav = () => {
    setShowNav(!showNav)
  }

  const [runLogoAnim, setRunLogoAnim] = useState(false)
  let mediaQuery = null
  if (!isSSR()) {
    mediaQuery = global.window.matchMedia("(min-width: 1366px)")
  }

  const handleMediaQueryChange = () => {

    if (!isSSR() && mediaQuery.matches) {
      setRunLogoAnim(true)
      // We do this so that navigating pages after the size changes does not
      // trigger animation on every link click after that (We cant tell when the animation has run.)
      setTimeout(() => { setRunLogoAnim(false) }, 2000)
    }

  }

  useEffect(() => {
    mediaQuery.addEventListener("change", evt => handleMediaQueryChange(evt))
    return () => {
      mediaQuery.removeEventListener("change", evt =>
        handleMediaQueryChange(evt)
      )
    }
  })

  const stateValues = {
    showNavState: [showNav, toggleShowNav],
    runLogoAnimState: [runLogoAnim, setRunLogoAnim],
  }

  return (
    <NavContext.Provider value={stateValues}>
      {element.children}
    </NavContext.Provider>
  )
}

