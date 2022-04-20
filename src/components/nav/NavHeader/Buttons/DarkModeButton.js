import React from "react"
import { css } from "@emotion/react"
import commonButtonCSS from "./buttonCSS"
import DarkModeToggle from "gatsby-head-style-boss/components/DarkModeToggle"

const dmButtonCSS = css`
  padding: 0px;

  /* .dark-mode-toggle comes from gatsby-head-style-boss/components/DarkModeToggle.js */
  & > .dark-mode-toggle {
    background-color: var(--color-background-paper);
    transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 10px;
    margin: 0px;
    height: 100%;
    width: 100%;
    aspect-ratio: 1 / 1;
  }
`

const DarkModeButton = () => {
  return (
    <div id="darkModeButton" css={[commonButtonCSS, dmButtonCSS]}>
      <DarkModeToggle />
    </div>
  )
}

export default DarkModeButton
