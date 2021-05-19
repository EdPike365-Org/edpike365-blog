import React from "react"
import { Link } from "gatsby"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import HamburgerButton from "./HamburgerButton"
import LogoIcon from "./LogoIcon"
import LogoText from "./LogoText"

//TODO
//const SettingsIcon
//const SettingsPanel

// mobile first
// cell phone width: hamburger, logo, logotext, notifications, login
export const StyledHeader = styled.header`
  background-color: var(--color-background-paper);

  width: 100%;
  box-shadow: var(--shape-box-shadow);
  padding: .5rem;
  z-index: 999;

  overflow-y: hidden;

  display: flex;
  justify-content: space-between; /* this will flush logodiv to left if the nav button is hidden */
  align-items: center; /* align vertical center */
  overflow: hidden;

  grid-area: header;
`

export const LogoDiv = styled.div`
  padding: 0rem;  
  display: flex;
  align-items: center;
`

export const SlideLogoDivLeft = keyframes`
  0% {
    margin-left: 300px;
  }
  100% {
    margin-left: 0px;
  }
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--color-primary-dark);
  text-decoration: none;
`

const SocialDiv = styled.div`
  display: flex;
  align-items: center;
`

const Header = () => {

  return (
    <StyledHeader>
      <HamburgerButton />
      <LogoDiv>
        <LogoLink to="/">
          <LogoIcon />
          &nbsp;
          <LogoText />
        </LogoLink>
      </LogoDiv>
      <SocialDiv>

      </SocialDiv>
    </StyledHeader>
  )
}

export default Header
