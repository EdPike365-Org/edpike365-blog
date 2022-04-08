import React from "react"
import HamburgerButton from "./buttons/HamburgerButton"
import LogoLink from "./LogoLink"
import ButtonDivRight from "./ButtonDivRight"
import { Header } from "./NavHeaderComps"

const NavHeader = () => {
  //TODO add search icon next to hamburger
  //TODO add settings icon next to darkmode toggle
  return (
    <Header>
      <HamburgerButton />
      <LogoLink />
      <ButtonDivRight />
    </Header>
  )
}

export default NavHeader
