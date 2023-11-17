import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { NavContext } from '../../../../contexts/NavContext'
import * as styles from './NavLink.module.css'

// TODO The activeClassName is still not being activated when the NavLink is nested
// under a NavSubMenu. The implementation is written in Gatsby Link.

// https://github.com/brohlson/gatsby-plugin-anchor-links

const NavLink = props => {
  //showNavState is a state nested in the NavContext context
  const { showNavState } = useContext(NavContext)
  const toggleShowNav = showNavState[1] //[0] is the state, [1] is the setter

  if (props.useNativeLink) {
    return (
      <a
        role="menuitem"
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
        role="menuitem"
        className={styles.navLinkStyle}
        activeClassName={styles.activeLinkCss}
        partiallyActive={props.partiallyActive || true}
        onClick={toggleShowNav}
        {...props}
      />
    )
  }
}

export default NavLink
