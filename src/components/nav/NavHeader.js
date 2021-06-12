import React, { useContext } from "react"
import { NavContext } from "../../contexts/NavContext"
import HamburgerButton from "./HamburgerButton"
import Logo from "./Logo"
import LogoText from "./LogoText"
import { DarkModeToggle } from "gatsby-head-style-boss/components/HSB_Components"
import UserButton from "./UserIconButton"
import { Header, LogoDiv, LogoLink, ButtonDivRight } from "./NavHeaderComps"

const NavHeader = () => {
  const { runLogoAnimState } = useContext(NavContext)
  const [runLogoAnim] = runLogoAnimState

  return (
    <Header>
      <HamburgerButton />
      <LogoLink to="/">
        <LogoDiv runLogoAnim={runLogoAnim}>
          <Logo />
          <LogoText />
        </LogoDiv>
      </LogoLink>

      <ButtonDivRight>
        <DarkModeToggle />
        <UserButton />
      </ButtonDivRight>
    </Header>
  )
}

export default NavHeader
