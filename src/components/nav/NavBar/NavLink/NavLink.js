import React, { useContext } from "react"
import { Link } from "gatsby"
import { NavContext } from "../../../../contexts/NavContext"
import * as styles from "./styles.module.css"

// I could not figure out how to get Link activeClassName to work with Emotion.
// So I used css modules.

// TODO The activeClassName is still not being activated when the NavLink is nested
// under a NavSubMenu. The implementation is written in Gatsby Link.

// TODO investigate user style sheets
// https://www.viget.com/articles/inline-styles-user-style-sheets-and-accessibility/

// https://github.com/brohlson/gatsby-plugin-anchor-links
export const NavLink = props => {
  //showNavState is a state nested in the NavContext context
  // TODO rename showNavState to showNavBarState
  const { showNavState } = useContext(NavContext)
  const toggleShowNav = showNavState[1] //[0] is the state, [1] is the setter

  if (props.useNativeLink) {
    return (
      <a
        className={styles.navLinkStyle}
        href={props.to}
        onClick={toggleShowNav}
      >
        {props.children}
      </a>
    )
  } else {
    return (
      <Link
        className={styles.navLinkStyle}
        activeClassName={styles.activeLinkCss}
        partiallyActive={props.partiallyActive || true}
        onClick={toggleShowNav}
        {...props}
      />
    )
  }
}
