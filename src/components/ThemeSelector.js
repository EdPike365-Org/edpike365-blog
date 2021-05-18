import React, { useState } from "react"
import { Global } from "@emotion/react"
import { coreTheme } from "../styles/coreTheme.js"
import { darkTheme } from "../styles/darkTheme.js"

// Use context hook

// TODO move to utils
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  )
}

// prebuild style arrays to use with emotion <Global>
const defaultCssStyles = [coreTheme]

const darkCssStyles = [...defaultCssStyles]
darkCssStyles.push(darkTheme)

export const ThemeSelector = () => {
  const [cssStyles, setCssStyles] = useState(defaultCssStyles)

  const themeSelectorOptions = [
    {
      value: "default",
      label: "Light",
      themeObject: defaultCssStyles,
    },
    {
      value: "darkTheme",
      label: "Dark",
      themeObject: darkCssStyles,
    },
  ]

  function selectTheme(event) {
    const selectedValue = event.target.selectedOptions[0].value
    console.log("Theme selected: " + selectedValue)
    const selectedThemeOptions = themeSelectorOptions.filter(obj => {
      return obj.value === selectedValue
    })
    const selectedThemeObject = selectedThemeOptions[0].themeObject
    setCssStyles(selectedThemeObject)
  }

  return (
    <>
      <select onChange={selectTheme}>
        {themeSelectorOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Global styles={cssStyles} />
    </>
  )
}

export const DarkModeToggle = () => {
  const [cssStyles, setCssStyles] = useState(defaultCssStyles)

  function toggleDarkMode() {
    console.log("button click...")

    if (arrayEquals(cssStyles, darkCssStyles)) {
      setCssStyles(defaultCssStyles)
    } else {
      setCssStyles(darkCssStyles)
    }
  }

  return (
    <>
      <button onClick={toggleDarkMode}>Click me</button>
      <Global styles={cssStyles} />
    </>
  )
}
