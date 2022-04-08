import React, { useLayoutEffect, useRef } from "react"
import { css } from "@emotion/react"
import { useLocation } from "@gatsbyjs/reach-router"

const navULStyle = css`
  color: var(--color-primary-main);
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto;
`
export const SESSION_STORAGE_SCROLLTOP_KEY = "NavULScroll"

export const NavUL = props => {
  // When the component loads, try to restore scrollTop
  const location = useLocation()
  const thisRef = useRef(null)

  useLayoutEffect(() => {
    let scrollPosition = window.sessionStorage.getItem(
      SESSION_STORAGE_SCROLLTOP_KEY
    )

    if (scrollPosition === null) {
      console.log("scrollPosition from storage was null")
    }

    // TODO why would thisRef.current be null? SSR?
    if (thisRef.current && scrollPosition) {
      thisRef.current.scrollTop = scrollPosition
      console.log("!!! scrolled to ", scrollPosition)
    } else {
      console.log("!!! thisRef.current was null, not scrolled to ")
    }
  }, [location.pathname])

  const scrollHandler = () => {
    if (thisRef.current) {
      window.sessionStorage.setItem(
        SESSION_STORAGE_SCROLLTOP_KEY,
        thisRef.current.scrollTop
      )
    }
  }

  return (
    <ul css={navULStyle} ref={thisRef} onScroll={scrollHandler}>
      {props.children}
    </ul>
  )
}
