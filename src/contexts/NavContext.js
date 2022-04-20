import React, { createContext, useState, useEffect } from "react"
import { isSSR } from "../utils/HelperFunctions"

const WINDOW_WIDTH_THRESHOLD = 1366

export const NavContext = createContext({
  showNav: false,
  toggleShowNav: () => {},
})

// we have multiple states in one context
export const NavContextProvider = element => {
  // State 1: showNav. Controls the left side navbar visibility.
  let initialShowNavState = false
  if (window.innerWidth > WINDOW_WIDTH_THRESHOLD) {
    initialShowNavState = true
  }

  const [showNav, setShowNav] = useState(initialShowNavState)

  const toggleShowNav = () => {
    // Link widget calls toggleShowNav() when the user clicks on a link.
    // Ignore it if window is wide, because the navbar is always visible.
    console.log(window.innerWidth)
    if (window.innerWidth < WINDOW_WIDTH_THRESHOLD) {
      setShowNav(!showNav)
    }
  }

  // State 2: runLogoAnimation
  // The Logo tumbling animation runs when the screen size grows wide enough
  // It tumbles from center to the become left justified.
  // It does not tumble back to center when the screen width shrinks.
  // TODO: I was going to make it tumble back to center when the screen shrinks,
  // but I forget why it did not work
  const [runLogoAnim, setRunLogoAnim] = useState(false)

  // We need a media query to check if the screen is small enough to run logo animation.
  let mediaQuery = null
  // we have to use the isSSR or it will fail during Gatsby server side render
  if (!isSSR()) {
    mediaQuery = window.matchMedia(
      "(min-width: " + WINDOW_WIDTH_THRESHOLD + "px)"
    )
  }

  const handleMediaQueryChange = () => {
    if (!isSSR() && mediaQuery.matches) {
      setShowNav(true)
      setRunLogoAnim(true)
      // This will run the animation on infinite loop.
      // So after enough time for it to run once, we set it false.
      // TODO: cludgy. Can we use CSS animation setting to make it run only once?
      // since we are using this much js already, we could control it explicitly instead.
      setTimeout(() => {
        setRunLogoAnim(false)
      }, 2000)
    }
  }

  // This mounts the listener when the component is loaded.
  // And unmounts when the component is unloaded.
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
