import React from "react"
import * as styles from "./NavLI.module.css"

/* NavLI are used by the SubUL and the button expandable component */
//  passed in   activeStyle={styles.activeLinkStyle}
const NavLI = props => {
  return (
    <li
      className={`${styles.navLICSS}`}
    >
      {props.children}
    </li>
  )
}

export default NavLI
