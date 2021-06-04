import React, { useContext } from "react"
import styled from "@emotion/styled"
import HamburgerIcon from "./HamburgerIcon"
import { NavContext } from "../contexts/NavContext"

export const HamButton = styled.button`
  padding: 0rem;
  border: none;
  cursor: pointer;
  background-color: var(--color-background-paper);
`

const HamburgerButton = () => {
  const { toggleShowNav } = useContext(NavContext)
  return (
    <HamButton onClick={toggleShowNav} aria-label={"Navigation"}>
      <HamburgerIcon fontHeight="1.5rem" />
    </HamButton>
  )
}

export default HamburgerButton
