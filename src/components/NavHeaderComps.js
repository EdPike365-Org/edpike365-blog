import { Link } from "gatsby"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { HamButton } from "./HamburgerButton"
import { LogoIconDiv } from "./Logo"
import { DarkModeButton } from "./SHG_Components"

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
`

export const Header = styled.header`
  grid-area: header;

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

  /* In tiny default mode, no Logo Icon visible */
  & > ${LogoIconDiv} {
    display: none;
  }

  /*---- Normal Phones: Show Logo --------- */
  @media only screen and (min-width: 320px) {
    height: var(--header-height-mobile);
    & > ${LogoIconDiv} {
      display: inline;
    }
  }

  /* ---------------- Larger Phones ---------------- */
  @media only screen and (min-width: 540px) {

  }

  /*-------------------- Tablet  --------------------*/
  @media only screen and (min-width: 700px) {
    height: var(--header-height-tablet);
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
    }
  }

  @-webkit-keyframes MOVE-LOGO-LEFT {
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
  }
  @-moz-keyframes MOVE-LOGO-LEFT {
    0% {
      margin-left: 35%;
      -ms-transform: rotate(180deg); /* IE 9 */
      -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
      transform: rotate(180deg);
    }
    100% {
      margin-left: 0px;
    }
  }
  @-o-keyframes MOVE-LOGO-LEFT {
    0% {
      margin-left: 35%;
      -ms-transform: rotate(180deg); /* IE 9 */
      -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
      transform: rotate(180deg);
    }
    100% {
      margin-left: 0px;
    }
  }
  @keyframes MOVE-LOGO-LEFT {
    0% {
      margin-left: 35%;
      -ms-transform: rotate(180deg); /* IE 9 */
      -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
      transform: rotate(180deg);
    }
    100% {
      margin-left: 0px;
    }
  }
  /*-------------------- Large Desktop  --------------------*/
  @media only screen and (min-width: 1366px) {
    ${props =>
      props.runLogoAnim ? "animation: MOVE-LOGO-LEFT 1s ease-out;" : ""}
    margin-right: auto;
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
