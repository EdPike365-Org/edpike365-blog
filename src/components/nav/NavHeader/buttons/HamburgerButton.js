import React, { useContext } from "react"
import styled from "@emotion/styled"
import HamburgerIcon from "../../../../icons/HamburgerIcon"
import XIconRegular from "../../../../icons/XIconRegular"
import { NavContext } from "../../../../contexts/NavContext"

export const HamButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
  margin: 5px 5px;
  /* need to pad to the widest icon to prevent resize */
  width: 30px;
  height: 30px;

  border: none;
  letter-spacing: 0px;
  cursor: pointer;
  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
`
//Note: if button has no dimensions, or no text, icons wont render
const HamburgerButton = () => {
  const { showNavState } = useContext(NavContext)
  const [showNav, toggleShowNav] = showNavState
  return (
    <HamButton onClick={toggleShowNav} aria-label={"Navigation"}>
      {showNav ? <XIconRegular /> : <HamburgerIcon />}
    </HamButton>
  )
}

export default HamburgerButton
