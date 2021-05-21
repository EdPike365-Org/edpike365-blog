import React, { useEffect, useState, useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

//This will show the "prefers-color-scheme" value for this browser, reactively
//NOTE: Hook functions must use camel case because of linting rules.

function ListenForPreferredColorSchemeChange() {
  //NOTES ON INTERACTIONS WITH CHROME DEV TOOLS:
  //On Windows 10, Chrome gets its settings from the OS via Settings> Colors
  //  options: light, dark, custom
  //This value can be overridden using Chrome dev tools > Rendering > Emulate CSS prefers-color-scheme
  //  options: no-preference, light, dark

  // Check if window is defined (so if in the browser or in node.js).
  const isBrowser = typeof window !== "undefined"
  let prefersDarkColorScheme = false;
  if(isBrowser){
    prefersDarkColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  // useState and useEffect has to be declared in a component
  // OR in a function that returns a var to a component
  // which is a happy little hack
  const [prefersDarkMode, setPrefersDarkMode] = useState(
    prefersDarkColorScheme
  )

  useEffect(() => {
    function handleDarkModePrefferedChange() {
      const doesMatch = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
      // changing the state makes the "prefers darkmode" visual component update
      setPrefersDarkMode(doesMatch)
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleDarkModePrefferedChange)

    //good house keeping to remove listener, good article here https://www.pluralsight.com/guides/how-to-cleanup-event-listeners-react
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleDarkModePrefferedChange)
    }
  }, [])

  return prefersDarkMode
}

export const PreferredThemeListener = ({ showText }) => {

  const { updateThemeName } = useContext(ThemeContext)

  //STEP 1: check localstorage
  // if that exist, and you can find a matching theme in themeOptions, set that
  
  //STEP 2: else if localstorage vale does not exist, start checking OS state
  // prefersDarkMode is a useState variable exported by the function ListenForPreferredColorSchemeChange()
  const prefersDarkMode = ListenForPreferredColorSchemeChange()

  console.log("PreferredThemeListener: prefersDarkMode = " + prefersDarkMode)
  if (prefersDarkMode) {
   // console.log("PreferredThemeListener: updatingThemeName to darkTheme.")
    //updateThemeName("darkTheme")
  } else {
    //console.log("PreferredThemeListener: updatingThemeName to lightTheme.")
    //updateThemeName("lightTheme")
  }

  if (showText) {
    return <span>Prefers Dark Mode = { prefersDarkMode.toString() }.</span>
  } else {
    return null
  }
}
