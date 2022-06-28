import React, { useLayoutEffect, useRef, useContext } from "react"
import { css } from "@emotion/react"
import { useLocation } from "@gatsbyjs/reach-router"
import { NavContext } from "../../../contexts/NavContext"

const navULStyle = css`
  color: var(--color-primary-main);
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto;
`

const SESSION_STORAGE_SCROLLTOP_KEY = "NavULScroll"

export const NavUL = props => {
  // When the component loads, try to restore scrollTop
  const thisRef = useRef(null)
  const location = useLocation()

  // When the navBar is open, restore scroll position
  const { showNavState } = useContext(NavContext)
  const showNav = showNavState[0]

  useLayoutEffect(() => {
    // If navBar is closed, don't do anything
    if (!showNav) {
      return
    }

    let scrollY = window.sessionStorage.getItem(SESSION_STORAGE_SCROLLTOP_KEY)

    if (thisRef.current && scrollY) {
      thisRef.current.scrollTop = scrollY
    }

    // if the URL, or the state of showNav changes, run this
  }, [location.pathname, showNav])

  const scrollHandler = () => {
    if (thisRef.current) {
      window.sessionStorage.setItem(
        SESSION_STORAGE_SCROLLTOP_KEY,
        thisRef.current.scrollTop
      )
    }
  }

  return (
    <ul
      id="NavBarNavUL"
      css={navULStyle}
      ref={thisRef}
      onScroll={scrollHandler}
    >
      {props.children}
    </ul>
  )
}
