import React, { createContext, useState } from "react"
import { defaultThemeObject } from "../styles/themes"

// This context's only job is store the a themeName string
// It should not modify state anywhere
export const ThemeContext = createContext()

//preventing flash before darkmode load: https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app
export const ThemeContextProvider = ({children}) => {
  // a context actually holds a "useState" pair
  // essentially, useContext is just a wrapper for a useState
  // the wrapper just sticks the state up above the components
  
  let initialThemeName = null
  let prefersDarkMode = false
  // Check if window is defined (so if in the browser or in node.js).
  const isBrowser = typeof window !== "undefined"

  if(isBrowser){
    initialThemeName = window.localStorage.getItem('themeName');
    prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  } 
  console.log("ThemeContextProvider: localStore themeName is " + initialThemeName)

  if(!initialThemeName){
    if(prefersDarkMode){
      initialThemeName = "darkTheme"
      console.log("ThemeContextProvider: no localStore themeName BUT OS prefer dark mode = true")
    }else{
      initialThemeName = defaultThemeObject.value
      console.log("ThemeContextProvider: no localStore OR prefer dark mode, setting initialThemeName to defaultThemeName")
    }
  }

  
  //console.log("ThemeContextProvider: setting initial useState to " + initialThemeName)
  const [themeName, setThemeName] = useState(initialThemeName)
  console.log("ThemeContextProvider: useState() called, themeName is now: " + themeName)
  
  const updateThemeName = (newThemeName) => {
    if(newThemeName === themeName){
      console.log("ThemeContextProvider: updateThemeName(): newThemeName " + newThemeName + " SAME as old theme name, NOT updating")
      return;
    }else{
      console.log("ThemeContextProvider: updateThemeName(): newThemeName " + newThemeName + " diff from old, caling setThemeName")
      return setThemeName(newThemeName)
    }
    
  }

  return (
    <ThemeContext.Provider value={{ themeName, updateThemeName }}>
      {children}
    </ThemeContext.Provider>
  )
}

/* this is for Gatsby to use to wrap the root element */
export const ThemeWrapper = ({ element }) => (
  <ThemeContextProvider>
    {element}
  </ThemeContextProvider>
)
