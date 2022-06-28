import React from "react"
import { css } from "@emotion/react"
import LogoDiv from "./LogoDiv"
import { ButtonDivLeft } from "./ButtonDivs/ButtonDivLeft"
import { ButtonDivRight } from "./ButtonDivs/ButtonDivRight"

// NOTE: dimensions are in px units, not rem, because we need precision in the header

const headerCSS = css`
  grid-area: header;

  box-sizing: border-box;

  width: 100%;
  height: 100%;

  padding: 2px;
  margin: 0px;
  overflow: hidden;

  display: flex;
  align-items: center;

  /* Flush logodiv to left if the nav hamburger button is hidden */
  justify-content: space-between;

  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  box-shadow: var(--shape-box-shadow);
`

const Header = () => {
  //TODO add search icon next to hamburger
  //TODO add settings icon next to darkmode toggle

  return (
    <header id="mainHeader" css={headerCSS}>
      <ButtonDivLeft />
      <LogoDiv />
      <ButtonDivRight />
    </header>
  )
}

export default Header
