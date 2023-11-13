import React, { createContext, useState, useEffect } from 'react'
import { isSSR } from '../utils/HelperFunctions'

// REMEMBER, this context must be mounted in the gatsby-browser.js file.

// TODO rename showNavState to navBarOpenState

const WINDOW_WIDTH_THRESHOLD = 1366

// TODO I honestly dont remember why this only has showNav state stuff here and nothing about the logo animation.
// I think I could have created it as an empty object.
export const NavContext = createContext({
  showNav: false,
  toggleShowNav: () => {},
})

/* We have multiple states in this context:
 * State 1. showNav. Controls the left side navbar visibility.
 * State 2. runLogoAnimation. Controls the logo tumbling animation.
 */
// Element is a special prop that contains the children.
export const NavContextProvider = element => {
  // State 1: showNav
  // Controls the left side navbar visibility.
  let initialShowNavState = false

  if (!isSSR()) {
    if (window.innerWidth > WINDOW_WIDTH_THRESHOLD) {
      initialShowNavState = true
    }
  }

  const [showNav, setShowNav] = useState(initialShowNavState)

  const toggleShowNav = () => {
    // NavBar Link widgets always call toggleShowNav() when the user clicks on a them to make the NavBar close.
    // Ignore it if window is wide, because the navbar is always visible and doesnt need to close.
    if (window.innerWidth < WINDOW_WIDTH_THRESHOLD) {
      setShowNav(!showNav)
    }
  }

  // State 2: runLogoAnimation
  // The Logo tumbling animation runs when the screen size grows wide enough
  // It tumbles from center to the become left justified.
  // It does not tumble back to center when the screen width shrinks.
  // TODO: Make it tumble back to center when the screen shrinks...
  const [runLogoAnim, setRunLogoAnim] = useState(false)

  // We need a media query to check if the screen is small enough to run logo animation.
  let mediaQuery = null
  // we have to use the isSSR or it will fail during Gatsby server side render
  if (!isSSR()) {
    mediaQuery = window.matchMedia(
      '(min-width: ' + WINDOW_WIDTH_THRESHOLD + 'px)'
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
      // UPDATE: I think I changed the CSS to make it run only once but I dont have time to verify now.
      setTimeout(() => {
        setRunLogoAnim(false)
      }, 2000)
    }
  }

  // This mounts the listener when the NavContext is loaded.
  // And unmounts when its unloaded.
  useEffect(() => {
    mediaQuery.addEventListener('change', evt => handleMediaQueryChange(evt))
    return () => {
      mediaQuery.removeEventListener('change', evt =>
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
