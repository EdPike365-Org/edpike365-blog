import React from "react"
import { css } from "@emotion/react"
import LogoLink from "./LogoLink"
import { ButtonDivRight, ButtonDivLeft } from "./buttons/ButtonDivs"

// THIS IS WHERE THE MESSY MEDIA QUERY STUFF FOR THE HEADER LIVES
// Default to smallest supported size of width 280 (Galaxy Fold)
// We modify visibilty and size of all components in the Header
// or here in major subcomponents (vs letting them set themselves)
// NOTE: dimensions are in px units because we need precision in the header

const headerCSS = css`
  grid-area: header;

  box-sizing: border-box;
  width: 100%;

  padding: 0rem;
  overflow: hidden;

  display: flex;

  /* Flush logodiv to left if the nav hamburger button is hidden */
  justify-content: space-between;
  align-items: center;

  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  box-shadow: var(--shape-box-shadow);
`

const Header = ({ children }) => {
  //TODO add search icon next to hamburger
  //TODO add settings icon next to darkmode toggle

  return (
    <header id="mainHeader" css={headerCSS}>
      <ButtonDivLeft />
      <LogoLink />
      <ButtonDivRight />
    </header>
  )
}

export default Header
