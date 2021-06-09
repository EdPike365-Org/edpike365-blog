import { Link } from "gatsby"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { HamButton } from "./HamburgerButton"
import { LogoIconDiv } from "./Logo"
import { LogoTextSpan } from "./LogoText"
import { DarkModeButton } from "./SHG_Components"
import { UserButton } from "./UserIconButton"

// default to smallest supported size of width 280 (Galaxy Fold)
// We modify visibilty and size of all components in the Header
// or here in major subcomponents (vs letting them set themselves)
// NOTE: dimensions are in px units because we need precision
export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-dark);
  text-decoration: none;
`

export const ButtonDivRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* Turn off the DarkMode toggle on the header (not every instance of DarkMode toggle!) */
  & > ${DarkModeButton} {
    display: none;
  }

  /* ---------------- Larger Phones ---------------- */
  @media only screen and (min-width: 540px) {
    & > ${DarkModeButton} {
      display: inline-flex;
    }
  }

  /*-------------------- Tablet  --------------------*/
  @media only screen and (min-width: 700px) {
    & > ${DarkModeButton} {
      width: 42px;
      height: 42px;
    }
    & > ${UserButton} {
      width: 42px;
      height: 42px;
    }

  }
`

export const Header = styled.header`
  grid-area: header;

  box-sizing: border-box;
  width: 100%;
  height: var(--header-height-tiny);
  padding: 0rem;
  overflow: hidden;

  display: flex;
  justify-content: space-between; /* this will flush logodiv to left if the nav button is hidden */
  align-items: center; /* align vertical center */

  background-color: var(--color-background-paper);

  box-shadow: var(--shape-box-shadow);
  z-index: 999;
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out; 

  /*---- Normal Phones: Show Logo --------- */
  @media only screen and (min-width: 320px) {
    height: var(--header-height-mobile);
  }

  /* ---------------- Larger Phones ---------------- */
  @media only screen and (min-width: 540px) {

  }

  /*-------------------- Tablet  --------------------*/
  @media only screen and (min-width: 700px) {
    height: var(--header-height-tablet);
    & > ${HamButton} {
      width: 42px;
      height: 42px;
    }
  }

  /*-------------------- LapTop  --------------------*/
  @media only screen and (min-width: 1366px) {
    & > ${HamButton} {
      display: none;
    }
    /* TODO: Show the major nav links, like in Vice.com */
  }
`

export const LogoDiv = styled.div`
  padding: 0rem;
  margins: 0rem;
  display: flex;
  align-items: center;
  justify-content: center;

  /* In tiny default mode, no Logo Icon visible */
  & > ${LogoIconDiv} {
    display: none;
  }

  /*---- Normal Phones: Show Logo --------- */
  @media only screen and (min-width: 320px) {
    height: var(--header-height-mobile);
    & > ${LogoIconDiv} {
      display: inline;
      height: 42px;
      width: 42px;
    }
    & > ${LogoTextSpan}{
      font-size: 32px;
      letter-spacing: .12em;
    }
  }

  @media only screen and (min-width: 360px) {
    height: var(--header-height-mobile);
    & > ${LogoIconDiv} {
      display: inline;
      height: 48px;
      width: 48px;
    }
    & > ${LogoTextSpan}{
      font-size: 36px;
      letter-spacing: .1em;
    }
  }

  /* ---------------- Larger Phones ---------------- */
  @media only screen and (min-width: 540px) {
    & > ${LogoTextSpan}{
      font-size: 36px;
      margin-left: .15em;
      letter-spacing: .15em;
    }
  }

  /*-------------------- Tablet  --------------------*/
  @media only screen and (min-width: 700px) {
    height: var(--header-height-tablet);

    & > ${LogoIconDiv} {
      display: inline;
      height: 58px;
      width: 58px;
    }
    & > ${LogoTextSpan}{
      font-size: 48px;
      margin-left: .2em;
      letter-spacing: .2em;
    }
  }

  @keyframes SLIDE-LOGO-LEFT {
    0% {
      -ms-transform: translateX(30vw); /* IE 9 */
      -webkit-transform: translateX(30vw); /* Chrome, Safari, Opera */
      transform: translateX(30vw);
    }
    1% {

     -ms-transform: translateX(30vw); /* IE 9 */
     -webkit-transform: translateX(30vw); /* Chrome, Safari, Opera */
     transform: translateX(30vw);
   }
    100% {
      transform: translateX(.1vw);
    }
  }

  @keyframes FLIP-LOGO-LEFT {
    0% {
      -ms-transform: translateX(30vw); /* IE 9 */
      -webkit-transform: translateX(30vw); /* Chrome, Safari, Opera */
      transform: translateX(30vw);
    }
    1% {

     -ms-transform: translateX(30vw); /* IE 9 */
     -webkit-transform: translateX(30vw); /* Chrome, Safari, Opera */
     transform: translateX(30vw) rotate(0deg);
   }
    100% {
      transform: translateX(.1vw) rotate(360deg);
    
    }
  }

  /*-------------------- Large Desktop  --------------------*/
  @media only screen and (min-width: 1366px) {
    
    ${props =>
      props.runLogoAnim ? "animation: FLIP-LOGO-LEFT 1s ease-out;" : ""
    }

    & > ${LogoIconDiv} {
      width: var(--header-height-tablet);
      height: var(--header-height-tablet);
      padding-left: 10px;
    }

    & > ${LogoTextSpan}{
      font-size: 48px;
      margin-left: .1em;
      letter-spacing: .25em;
    }
  
  }
`

export const SlideLogoDivLeft = keyframes`
  0% {
    margin-left: 35%;
    -ms-transform: rotate(180deg); /* IE 9 */
    -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
    transform: rotate(180deg);
    transition: transform 0.2s ease-out;
  }
  100% {
    margin-left: 0px;
  }
`
