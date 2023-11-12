import React from "react"
import * as styles from "./Nav.module.css"

/* 
Nav is the outermost container.
It is hidden in smaller screens and controlled by the hamburger button.
Nav is always open/visible on larger screens.
TODO: It should **slide** open and closed but currently does not.
-Open anim: this should be working but is not. 
-Closing anim: In Gatsby prod, the whole page is reloaded when a link is clicked, 
 so we'd have to add a delay before the click is registered by the Gatsby Link.
*/

const Nav = props => {
  return <nav
    className={`${styles.navCSS} ${props.showNav ? styles.showNavCSS : styles.hideNavCSS} `}
  >
    {props.children}
  </nav>
}

export default Nav