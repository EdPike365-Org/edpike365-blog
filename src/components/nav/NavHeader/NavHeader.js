import React, { useContext } from "react"
import { NavContext } from "../../../contexts/NavContext"
import HamburgerButton from "./HamburgerButton"
import Logo from "./Logo"
import LogoText from "./LogoText"
import DarkModeToggle from "gatsby-head-style-boss/components/DarkModeToggle"
import UserButton from "./UserIconButton"
import SettingsButton from "./SettingsIconButton"
import { Header, LogoDiv, LogoLink, ButtonDivRight } from "./NavHeaderComps"

const NavHeader = () => {
  //TODO maybe i could move this state to LogoDiv
  const { runLogoAnimState } = useContext(NavContext)
  const [runLogoAnim] = runLogoAnimState

  //TODO add search icon next to hamburger
  //TODO add settings icon next to darkmode toggle
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
        <SettingsButton />
        <UserButton />
      </ButtonDivRight>
    </Header>
  )
}

export default NavHeader
