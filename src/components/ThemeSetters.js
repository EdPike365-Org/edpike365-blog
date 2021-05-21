import React, { useContext } from "react"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/react"
import { ThemeContext } from "../contexts/ThemeContext"
import { themeOptions, getThemeObject } from "../styles/themes"

export const ThemeContextListener = ({showText}) => {


  // This is the only place that the <Global styles> Theme should be set
  
  const { themeName } = useContext(ThemeContext)
  console.log("ThemeContextListener: themeName changed to " + themeName)

  const selectedTheme = getThemeObject(themeName)
  console.log("ThemeContextListener: setting Global styles to :" + selectedTheme.value)   

  //TODO: if you have more than one <Global> tags, and both try to update at same time
  //you will get a narsty surprise. In my case it only happens when switching from light to dark
  //there is some sort of node insert out of order error coming from Emotion
  if (showText) {
    return (
      <div>
        <h5  css={css` margin-bottom: .25rem; `}>Theme Context Listener</h5>
        <ul css={css` margin-top: .25rem; `}>
          <li>Theme Label = ({selectedTheme.label}).</li>
          <li>Theme Name/Value = ({selectedTheme.value}).</li>
        </ul>
      </div>
    )
  } else {
    return <Global styles={selectedTheme.themeObject} />
  }

}

function saveThemeName(themeName){
  localStorage.setItem("themeName", themeName);
}

export const ThemeSelector = () => {
  
  const { themeName, updateThemeName } = useContext(ThemeContext)

  function handleChange(e) {
    console.log("ThemeSelector: handleChange, value = " + e.target.value)
    saveThemeName(e.target.value);
    updateThemeName(e.target.value)
  }

  return (
    <select onChange={handleChange} value={themeName}>
      {themeOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export const DarkModeToggle = () => {
  
  const { themeName, updateThemeName } = useContext(ThemeContext)

  function toggleDarkMode() {
    console.log(
      "DarkModeToggle: toggleDarkMode() called. Current themeName = " + themeName
    )

    if (themeName === "darkTheme") {
      
      console.log(
        "DarkModeToggle: setting themeName to lightTheme. "
      )
      saveThemeName("lightTheme")
      updateThemeName("lightTheme")

    } else {
      
      console.log(
        "DarkModeToggle: setting themeName to darkTheme. "
      )
      saveThemeName("darkTheme")
      updateThemeName("darkTheme")

    }
  }

  const Button = styled.button`
    font-size: 1.6rem;
    font-weight: bold;
    width: 3rem;
    padding: 0rem;
    border: none;
    cursor: pointer;
    color: var(--color-text-secondary);
    background-color: var(--color-background-paper);
    white-space: pre-wrap;
  `

  return (
    <>
      <Button onClick={toggleDarkMode}>
        {themeName === "darkTheme" ? "☼ " : "☽ "}
      </Button>
    </>
  )
}
