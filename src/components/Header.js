import React from "react"
import { Link } from "gatsby"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import HamburgerButton from "./HamburgerButton"
import LogoIcon from "./LogoIcon"
import LogoText from "./LogoText"
import { DarkModeToggle } from "./ThemeSetters"

//TODO
//const SettingsIcon
//const SettingsPanel

// mobile first
// cell phone width: hamburger, logo, logotext, notifications, login
export const StyledHeader = styled.header`
  grid-area: header;

  background-color: var(--color-background-paper);

  width: 100%;
  height: var(--header-height-mobile);

  box-shadow: var(--shape-box-shadow);
  padding-top: 0rem;
  padding-bottom: 0rem;
  padding-left: 1rem;
  padding-right: 1rem;

  z-index: 999;

  overflow-y: hidden;

  display: flex;
  justify-content: space-between; /* this will flush logodiv to left if the nav button is hidden */
  align-items: center; /* align vertical center */
  overflow: hidden;
`

export const LogoDiv = styled.div`
  padding: 0rem;
  display: flex;
  align-items: center;

  /* logo icon */
  & > a > span:first-of-type {
    display: none;
  }

  /* logo font */
  & > a > span:nth-of-type(2) {
    font-size: 2.5rem;
  }
`

export const SlideLogoDivLeft = keyframes`
  0% {
    margin-left: 35%;
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
      <div>
        <HamburgerButton />
      </div>
      <LogoDiv>
        <LogoLink to="/">
          <LogoIcon />
          &nbsp;
          <LogoText />
        </LogoLink>
      </LogoDiv>
      <SocialDiv>
        <DarkModeToggle />
      </SocialDiv>
    </StyledHeader>
  )
}

export default Header
