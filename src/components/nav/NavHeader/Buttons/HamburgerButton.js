import React, { useContext } from "react"
import { css } from "@emotion/react"
import { NavContext } from "../../../../contexts/NavContext"
import commonButtonCSS from "./buttonCSS"
import HamburgerIcon from "../../../../icons/HamburgerIcon"
import XIconRegular from "../../../../icons/XIconRegular"

const hamburgerButtonCSS = css`
  padding: 0px;
  & > #HamburgerIcon {
    height: 100%;
    padding: 10px;
  }
  & > #XIconRegular {
    height: 100%;
    width: 100%;
  }
  &:hover {
    transform: translateX(-1px) translateY(-1px);
  }
`

//Note: if button has no dimensions, or no text, icons wont render
const HamburgerButton = () => {
  const { showNavState } = useContext(NavContext)
  const [showNav, toggleShowNav] = showNavState
  return (
    <button
      id="hamburgerButton"
      css={[commonButtonCSS, hamburgerButtonCSS]}
      onClick={toggleShowNav}
      aria-label={"Navigation"}
    >
      {showNav ? <XIconRegular /> : <HamburgerIcon />}
    </button>
  )
}

export default HamburgerButton
