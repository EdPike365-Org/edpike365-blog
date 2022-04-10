import React, { useContext } from "react"
import { css } from "@emotion/react"
import HamburgerIcon from "../../../../icons/HamburgerIcon"
import XIconRegular from "../../../../icons/XIconRegular"
import { NavContext } from "../../../../contexts/NavContext"

const buttonCSS = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
  margin: 0px 0px 0px 5px;
  height: 100%;
  aspect-ratio: 1 / 1;

  border: none;
  letter-spacing: 0px;
  cursor: pointer;
  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
`
//Note: if button has no dimensions, or no text, icons wont render
const HamburgerButton = () => {
  const { showNavState } = useContext(NavContext)
  const [showNav, toggleShowNav] = showNavState
  return (
    <button
      id="hamburgerButton"
      css={buttonCSS}
      onClick={toggleShowNav}
      aria-label={"Navigation"}
    >
      {showNav ? <XIconRegular /> : <HamburgerIcon />}
    </button>
  )
}

export default HamburgerButton
