import React, { useState, useRef, useLayoutEffect } from "react"
import styled from "@emotion/styled"
import { keyframes, css } from "@emotion/react"
import { SESSION_STORAGE_SCROLLTOP_KEY } from "./NavUL"
//TODO: add option for exclusive open. Requires groups.
/* THE SCROLLHEIGHT PROBLEM
If you set display:none when first loading, the scrollHeight will not reserve
space for this submenu. If you then open it, 
the parent UL will still grow and show scrollbars accurately.
HOWEVER if you try to programatically scroll beyond the initial scrollHeight, 
the browser ignores the "scrollTop = x" command. 
SOLUTION: We default to display:flex, but close as required in useLayoutEffect.
This reserves the full height when all submenus are open.
*/

const SubMenu = styled.ul`
  list-style-type: none;
  color: var(--color-primary-main);
  letter-spacing: var(--font-letter-spacing-overline);
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const SubMenuButton = styled.button`
  display: flex;
  flex-direction: row;
  border: none;
  background-color: var(--color-background-paper);
  width: 100%;
  padding: 0px;
  margin: 0px;

  color: var(--color-primary-main);
  letter-spacing: var(--font-letter-spacing-overline);
  cursor: pointer;
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
`

const FadeSpan = styled.span`
  white-space: pre;
`

export const Slide = keyframes`
  0% {
    transform-origin: top;
    transform: scaleY(1);
  }
  100% {
    transform-origin: top;
    transform: scaleY(0);
  }
`
const SlideClosed = css`
  animation: ${Slide} 2s;
  display: none;
`

// TODO
const modifySessionScrollTop = thisRef => {
  // this is for the edge case when you close a submenu
  // then click on a link further down the page: the scrollTop is too high.
  // Before we close the submenu, we have to add that height
  // to the sessionStorage scrollTop
  // 1. grab the height of me when open
  const componentScrollHeight = thisRef.current.scrollHeight
  // 2. grab the current scrollTop in session mem
  const sOldScrollTop = window.sessionStorage.getItem(
    SESSION_STORAGE_SCROLLTOP_KEY
  )
  if (!sOldScrollTop) {
    return
  }
  const oldScrollTop = Number(sOldScrollTop)
  if (isNaN(oldScrollTop)) {
    return
  }
  // 3. add 1 and 2 and store in session mem
  const newScrollTop = oldScrollTop + componentScrollHeight
  console.log(
    `modifySessionScrollTop: newScrollTop ${newScrollTop} = oldScrollTop ${oldScrollTop} + componentScrollHeight ${componentScrollHeight}`
  )
  // store it in session mem
  window.sessionStorage.setItem(SESSION_STORAGE_SCROLLTOP_KEY, newScrollTop)
}

export const NavSubMenu = ({ title, uuid, children, defaultOpen = "true" }) => {
  // we default open to set NavUL scrollHeight properly
  const [isOpen, setIsOpen] = useState(true)
  const thisRef = useRef(null)

  // if isOpen is stored in sessionStorage, use that
  useLayoutEffect(() => {
    // getItem() loads all as strings, must convert to bool
    const statusStr = sessionStorage.getItem(uuid) || defaultOpen
    setIsOpen(statusStr.toLowerCase() === "true")
  }, [uuid, defaultOpen])

  useLayoutEffect(() => {
    //modifySessionScrollTop(thisRef)

    // setItem() auto converts boolean args to strings
    sessionStorage.setItem(uuid, isOpen)
  }, [uuid, isOpen])

  // this has to be here so the css can reference isActive
  const SubMenuLinks = styled.div`
    display: flex;
    flex-direction: column;
    transition: transform 400ms ease-in-out;
    ${isOpen ? "" : SlideClosed}
  `
  // TODO implement animation
  /*
  ${isOpen
    ? "display: flex;"
    : "display: none; "}
  transition: all 1.0s ease;
  postion: relative;
  transform-origin: top;
  -ms-transform: scale(1,.5);
  -webkit-transform: scale(1,.5); 
  transform: scale(1,.5);
  */

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <SubMenu ref={thisRef}>
      <SubMenuButton onClick={toggleOpen} role="menu">
        <FadeSpan>{title}</FadeSpan>
        <FadeSpan>{isOpen ? "  -" : "  +"}</FadeSpan>
      </SubMenuButton>
      <SubMenuLinks role="menuitems">{children}</SubMenuLinks>
    </SubMenu>
  )
}
