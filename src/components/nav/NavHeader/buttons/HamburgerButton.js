import React, { useContext } from "react"
import { css } from "@emotion/react"
import { NavContext } from "../../../../contexts/NavContext"
import commonButtonCSS from "./buttonCSS"
import HamburgerIcon from "../../../../icons/HamburgerIcon"
import XIconRegular from "../../../../icons/XIconRegular"

const hamburgerButtonCSS = css``

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
