import React from "react"
import { Link } from "gatsby"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import HamburgerButton from "./HamburgerButton"
import LogoIcon from "./LogoIcon"
import LogoText from "./LogoText"
import { DarkModeToggle } from "./SHG_Components"
import UserButton from "./UserButton"

export const StyledHeader = styled.header`
  grid-area: header;

  background-color: var(--color-background-paper);

  width: 100%;
  height: var(--header-height-mobile);

  box-shadow: var(--shape-box-shadow);
  padding: 0rem;

  z-index: 999;

  overflow: hidden;

  display: flex;
  justify-content: space-between; /* this will flush logodiv to left if the nav button is hidden */
  align-items: center; /* align vertical center */

`

export const LogoDiv = styled.div`
  padding: 0rem;
  margins: 0rem;
  display: flex;
  align-items: center;
  justify-content: center;

  /* logo icon */
  & > a > span:first-of-type {
    height: 2rem;
  }

  /* logo font */
  & > a > span:nth-of-type(2) {
    font-size: 2rem;
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

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
`
//<div style={{ display: "none" }}><DarkModeToggle/></div>
const Header = () => {
  return (
    <StyledHeader>
      <HamburgerButton/>
      <LogoDiv>
        <LogoLink to="/">
          <LogoIcon />
          <LogoText />
        </LogoLink>
      </LogoDiv>
      <FlexDiv>
        <DarkModeToggle hide />
        <UserButton/>
      </FlexDiv>
    </StyledHeader>
  )
}

export default Header
