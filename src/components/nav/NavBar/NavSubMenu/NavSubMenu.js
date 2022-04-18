import React, { useState, useLayoutEffect, useContext } from "react"
import { Link } from "gatsby"
import { NavULAPI } from "../NavUL"
import {
  navSubMenuUL,
  subMenuActionsDiv,
  navLink,
  activeLinkStyle,
  expandButton,
  subMenuLinksDiv,
} from "./styles"

//TODO: add option for exclusive open. Will require a "radio group" mechanism.
/* THE SCROLLHEIGHT PROBLEM
If you set display:none when first loading, the scrollHeight will not reserve
space for this submenu. If you then open it, 
the parent UL will still grow and show scrollbars accurately.
HOWEVER if you try to programatically scroll beyond the initial scrollHeight, 
the browser ignores the "scrollTop = x" command. 
SOLUTION? We default to display:flex, but close as required in useLayoutEffect.
This reserves the full height when all submenus are open.
*/

export const NavSubMenu = ({
  title,
  navTarget,
  uuid,
  children,
  defaultOpen = "true",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const navAPI = useContext(NavULAPI)

  // if isOpen is stored in sessionStorage, use that
  useLayoutEffect(() => {
    const statusStr = sessionStorage.getItem(uuid) || defaultOpen
    // storage.getItem() loads all as strings, must convert to bool
    setIsOpen(statusStr.toLowerCase() === "true")
  }, [uuid, defaultOpen])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    // isOpen is not updated yet so still use !
    sessionStorage.setItem(uuid, !isOpen)
    if (navAPI) {
      navAPI.updateStoredScrollTop()
    }
  }

  return (
    <ul css={navSubMenuUL}>
      <div css={subMenuActionsDiv}>
        <Link
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
