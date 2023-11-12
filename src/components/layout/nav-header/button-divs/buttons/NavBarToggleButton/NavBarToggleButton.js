import React, { useContext } from "react"
import { NavContext } from "../../../../../../contexts/NavContext"
import * as styles from "../Buttons.module.css"
import HamburgerIcon from "../../../../../../icons/HamburgerIcon"
import XIconRegular from "../../../../../../icons/XIconRegular"

//Note: if button has no dimensions, or no text, icons wont render
const NavBarToggleButton = () => {

  const { showNavState } = useContext(NavContext)
  const [showNav, toggleShowNav] = showNavState

  return (
    <button
      id="navBarToggleButton"
      className={`${styles.commonButtonCSS} ${styles.navBarToggleButtonCSS} nav-bar-toggle-button`}
      onClick={toggleShowNav}
      aria-label={"Navigation"}
    >
      {showNav ? <XIconRegular /> : <HamburgerIcon />}
    </button>
  )
}

export default NavBarToggleButton
