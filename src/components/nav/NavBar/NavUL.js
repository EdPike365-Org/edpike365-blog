import React, { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { useLocation } from "@gatsbyjs/reach-router"
import ScrollToButton from "../ScrollToButton"
import { FaArrowCircleUp } from "@react-icons/all-files/fa/FaArrowCircleUp"

const navULStyle = css`
  color: var(--color-primary-main);
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto;
`

const SESSION_STORAGE_SCROLLTOP_KEY = "NavULScroll"

export const NavULAPI = React.createContext(null)

const scrollOptions = {
  top: 200,
  left: 0,
  behavior: "smooth",
}

export const NavUL = props => {
  // When the component loads, try to restore scrollTop
  const location = useLocation()
  const thisRef = useRef(null)

  useEffect(() => {
    let yVal = window.sessionStorage.getItem(SESSION_STORAGE_SCROLLTOP_KEY)

    if (yVal === null) {
      console.log("!!! yVal from storage was null")
      return
    }

    if (typeof yVal != "number") {
      console.log("yVal from storage was not a number, using parseInt. ")
      yVal = parseInt(yVal)
      yVal = 500
      console.log("yVal is now ", yVal)
    }

    if (thisRef.current && yVal) {
      //thisRef.current.scrollTop = yVal
      //const x = windows.getEleme
      thisRef.current.scroll(scrollOptions)

      console.log("!!! ATTEMPTED Restored thisRef.current.scrollTop = ", yVal)
      console.log("just attempted. New scroll top:", thisRef.current.scrollTop)
    } else {
      console.log("!!! thisRef.current was null ")
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

  // This is called when we close or open a submenu
  const updateStoredScrollTop = () => {
    if (thisRef.current) {
      console.log(
        "Called updateScrollTop, current.scrollTop ",
        thisRef.current.scrollTop
      )
      window.sessionStorage.setItem(
        SESSION_STORAGE_SCROLLTOP_KEY,
        thisRef.current.scrollTop
      )
    }
  }

  const setScrollPosition = yVal => {
    console.log("in setScrollPosition(), yVal = ", yVal)
    if (typeof storedScrollPosition !== "number") {
      console.log("yVal datatype was not number, value = ", yVal)
      return
    }

    const targetEl = thisRef.current
    console.log("MAX scroll top: ", targetEl.scrollTopMax)
    console.log("scrollHeight: ", targetEl.scrollHeight)

    /*
      const maxAvailableScroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
      console.log("maxAvailableScroll: ", maxAvailableScroll)
      */

    //scrollTop() is ancient, chrome 1
    targetEl.scrollTop = yVal

    //scroll() chrome 61, scrolls to a particular set of coords in element
    //scrollBy() chrome 61, scrolls by a given amount
    //scrollIntoView() called on the element that you want to scroll into view

    //scrollTo() just like scroll()
    /*
      targetEl.scrollTo({
        top: yVal,
        behavior: "smooth",
      })
      */
  }

  const navAPI = { updateStoredScrollTop, setScrollPosition }

  /*
      <ScrollToButton targetRef={thisRef}>
        <FaArrowCircleUp />
      </ScrollToButton>
<NavULAPI.Provider value={navAPI}>{props.children}</NavULAPI.Provider>
  */
  return (
    <ul id="NavULID" css={navULStyle} ref={thisRef} onScroll={scrollHandler}>
      {props.children}
    </ul>
  )
}
