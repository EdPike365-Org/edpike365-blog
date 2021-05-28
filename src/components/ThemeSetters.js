import React, { useContext } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { SHGStyleContext } from "../contexts/SHGContext"
//import { themeOptions, getThemeObject } from "../styles/themes"

export const ThemeContextListener = ({showText}) => {

  const { SHGModel } = useContext(SHGStyleContext)

//  const selectedTheme = getThemeObject(themeName)
//  console.log("ThemeContextListener: setting Global styles to :" + selectedTheme.value)   

  //TODO: if you have more than one <Global> tags, and both try to update at same time
  //you will get a narsty surprise. In my case it only happens when switching from light to dark
  //there is some sort of node insert out of order error coming from Emotion



    return (
      <div>
        <h5  css={css` margin-bottom: .25rem; `}>SHG Style Model State</h5>
        <ul css={css` margin-top: .25rem; `}>
          <li>Style Label = ({SHGModel.idPrefix}).</li>
          <li>Style ID = ({SHGModel.idPrefix}).</li>
        </ul>
      </div>
    )

}

export const StyleSelector = () => {
  
  const { SHGModel, setSHGModel } = useContext(SHGStyleContext)

  const styleElements = SHGModel.styleElements

  function handleChange(e) {
    console.log("StyleSelector: handleChange, value = " + e.target.value)
    //saveThemeName(e.target.value);
    //updateThemeName(e.target.value)
  }

  const styleArray = Array.from(styleElements)
  return (
    <select onChange={handleChange} value={"kj"}>
      {styleArray.map(styleEl => (
        <option key={styleEl.id} value={styleEl.id}>
          {styleEl.dataset.displayname}
        </option>
      ))}
    </select>
  )
}

export const DarkModeToggle = () => {
  
  const { SHGModel, setSHGModel } = useContext(SHGStyleContext)

  function toggleDarkMode() {
    console.log(
      "DarkModeToggle: toggleDarkMode() called. "
    )
/*
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
    */
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
  const themeName = "darkTheme"
  return (
    <>
      <Button onClick={toggleDarkMode}>
        {themeName === "darkTheme" ? "☼ " : "☽ "}
      </Button>
    </>
  )
}
