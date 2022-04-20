import React, { useState, useLayoutEffect, useContext } from "react"
import { Link } from "gatsby"
import { NavContext } from "../../../../contexts/NavContext"
import {
  navSubMenuUL,
  subMenuActionsDiv,
  navLink,
  activeLinkStyle,
  expandButton,
  subMenuLinksDiv,
} from "./styles"

//TODO: add option for exclusive open. Will require a "radio group" mechanism.
//TODO: any child links should call scrollIntoView on its parent (this)
export const NavSubMenu = ({
  title,
  navTarget,
  uuid,
  children,
  defaultOpen = "true",
}) => {
  /* Scroll Height Reservation Workarounds:
    - Works: defaultOpen = "true" and usestate(true) work correctly
    because on first session visit, all submenus are open, and UA (the browser)
    sets the scrollHeight(or max-height TODO?) to the max possible height.
    If the user closes some submenus, scrollTop, etc, will still work.
    - false/true sorta works but it is pure luck if the user opens "too many" submenus.
      and- Works: defaultOpen = "false" and usestate(false) work correctly
    - false/false, and true/false does not work at all. This causes all submenus to be closed
    on first visit. The navUL will never respond to scroll calls.
  */
  const [isOpen, setIsOpen] = useState(true)
  const { showNavState } = useContext(NavContext)
  const toggleShowNav = showNavState[1] //[0] is the state, [1] is the setter

  // if isOpen state is stored in sessionStorage, use that
  useLayoutEffect(() => {
    const statusStr = sessionStorage.getItem(uuid) || defaultOpen
    // storage.getItem() loads all as strings, must convert to bool
    setIsOpen(statusStr.toLowerCase() === "true")
  }, [uuid, defaultOpen])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    // at this point, isOpen state has still not updated, so !isOpen
    sessionStorage.setItem(uuid, !isOpen)
  }

  return (
    <ul css={navSubMenuUL}>
      <div css={subMenuActionsDiv}>
        <Link
          onClick={toggleShowNav}
          css={navLink}
          activeStyle={activeLinkStyle}
          partiallyActive={true}
          to={navTarget}
        >
          {title}
        </Link>
        <button css={expandButton} onClick={toggleOpen} role="menu">
          {isOpen ? "  -" : "  +"}
        </button>
      </div>
      <div css={subMenuLinksDiv(isOpen)} role="group">
        {children}
      </div>
    </ul>
  )
}
