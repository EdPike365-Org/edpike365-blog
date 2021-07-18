import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { keyframes, css } from "@emotion/react"
//TODO: add option for exclusive open
const SubMenu = styled.ul`
  list-style-type: none;
  color: var(--color-primary-dark);
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

  color: var(--color-primary-dark);
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
const SlideClosed = css` animation: ${Slide} 2s;  display: none;`

export const NavSubMenu = ({ title, uuid, children }) => {
  
  const [isActive, setIsActive] = useState(false)

  //TODO why uuid and not empty
  useEffect(() => {
    // loaded as string, convert to bool
    const statusStr = sessionStorage.getItem(uuid) || "false"
    setIsActive(statusStr.toLowerCase() === "true")
  }, [uuid])

  useEffect(() => {
    // setItem auto converts isActive to string
    sessionStorage.setItem(uuid, isActive)
  }, [uuid, isActive])



  const SubMenuLinks = styled.div`
    display: flex;
    flex-direction: column;
    transition: transform 400ms ease-in-out;
    ${isActive
      ? ""
      : SlideClosed }
  `
    /*
  ${isActive
    ? "display: flex;"
    : "display: none; "}
  transition: all 1.0s ease;
  postion: relative;
  transform-origin: top;
  -ms-transform: scale(1,.5);
  -webkit-transform: scale(1,.5); 
  transform: scale(1,.5);
  */

  const toggleActive = () => {
    setIsActive(!isActive)
  }

  return (
    <SubMenu>
      <SubMenuButton onClick={toggleActive} role="menu">
        <FadeSpan>{title}</FadeSpan>
        <FadeSpan>{isActive ? "  -" : "  +"}</FadeSpan>
      </SubMenuButton>
      <SubMenuLinks role="menuitems">{children}</SubMenuLinks>
    </SubMenu>
  )
}
