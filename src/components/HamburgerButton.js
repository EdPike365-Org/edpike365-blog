import React, { useContext } from "react"
import styled from "@emotion/styled"
import HamburgerIcon from "../icons/HamburgerIcon"
import XIconRegular from "../icons/XIconRegular"
import { NavContext } from "../contexts/NavContext"

export const HamButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  padding: .25rem;
  margin: 0rem;
  /* need to pad to the widest icon to prevent resize */
  width: 2.8rem;
  height: 2.8rem;
  
  border: none;
  letter-spacing: 0px;
  cursor: pointer;
  background-color: var(--color-background-paper);

`
//Note: if button has no dimensions, or no text, icons wont render
const HamburgerButton = () => {
  const { showNav, toggleShowNav } = useContext(NavContext)
  return (
    <HamButton onClick={toggleShowNav} aria-label={"Navigation"}>
      { showNav
        ? <XIconRegular/>
        : <HamburgerIcon/>
      }
    </HamButton>
  )
}

export default HamburgerButton
