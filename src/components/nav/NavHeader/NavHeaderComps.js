import { Link } from "gatsby"
import styled from "@emotion/styled"
import { HamButton } from "./HamburgerButton"
import { LogoIconDiv } from "./Logo"
import { LogoTextSpan } from "./LogoText"
import { SettingsButton } from "./SettingsIconButton"
import { UserButton } from "./UserIconButton"

// TODO: Make icons use max dimensions from parent containers
// so I can remove the dimensions from the icons.

// THIS IS WHERE THE MESSY MEDIA QUERY STUFF FOR THE HEADER LIVES
// Default to smallest supported size of width 280 (Galaxy Fold)
// We modify visibilty and size of all components in the Header
// or here in major subcomponents (vs letting them set themselves)
// NOTE: dimensions are in px units because we need precision in the header
export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-main);
  text-decoration: none;
`

export const ButtonDivRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  /* Header's DarkMode Toggle and SettingsButton are hidden */

  /* We are doing it as a child so not every instance of DarkMode toggle disappears */
  & > .dark-mode-toggle {
    display: none;
  }

  & > ${SettingsButton} {
    display: none;
  }

  /* ---- Normal Phones: Show Logo (320 x ) ---- */
  /* Display SettingsButton */
  @media only screen and (min-width: 320px) {
    & > ${SettingsButton} {
      display: inline-flex;
    }
  }

  /* ---- Larger Phones (540 x ) ---- */
  /* Display DarkMode toggle */
  @media only screen and (min-width: 540px) {
    & > .dark-mode-toggle {
      display: inline-flex;
    }
  }

  /* ---- Tablet (700 x ) ---- */
  /* Make buttons 42px square */
  @media only screen and (min-width: 700px) {
    & > .dark-mode-toggle {
      width: 42px;
      height: 42px;
    }
    & > ${SettingsButton} {
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

  padding: 0rem;
  overflow: hidden;

  display: flex;

  /* Flush logodiv to left if the nav hamburger button is hidden */
  justify-content: space-between;

  /* Align buttons vertically centered */
  align-items: center;

  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  box-shadow: var(--shape-box-shadow);

  /* ---- Tablet (700 x ) ---- */
  /* Ham button gets bigger (other buttons handled by ButtonDivRight) */
  @media only screen and (min-width: 700px) {
    & > ${HamButton} {
      width: 42px;
      height: 42px;
    }
  }

  /* ---- LapTop (1366 x ) ---- */
  /* Navbar permanently shows. Hamburger disappears. */
  @media only screen and (min-width: 1366px) {
    & > ${HamButton} {
      display: none;
    }
    /* TODO: Show more major nav links, like in Vice.com */
  }
`

export const LogoDiv = styled.div`
  /* Height controled by Header */
  height: 100%;

  padding: 0rem;
  margins: 0rem;
  display: flex;
  align-items: center;
  justify-content: center;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  /* No Logo Icon visible */
  & > ${LogoIconDiv} {
    display: none;
  }

  /* ---- Normal Phones: Show Logo (320 x ) ---- */
  /* Display the LogoIcon */
  @media only screen and (min-width: 320px) {
    /* height: var(--header-height-mobile); */

    & > ${LogoIconDiv} {
      display: inline;
      height: 48px;
      width: 48px;
    }
    & > ${LogoTextSpan} {
      font-size: 36px;
      letter-spacing: 0.1em;
    }
  }

  /* ---- Larger Phones (540 x ) ---- */
  /* The logo text can spread out some more, more letter spacing */
  @media only screen and (min-width: 540px) {
    & > ${LogoIconDiv} {
      display: inline;
      height: 48px;
      width: 48px;
    }
    & > ${LogoTextSpan} {
      font-size: 36px;
      margin-left: 0.15em;
      letter-spacing: 0.15em;
    }
  }

  /* ---- Tablet (700 x ) ---- */
  /* Tablet header height : 64px */
  @media only screen and (min-width: 700px) {
    /* height: var(--header-height-tablet); */

    & > ${LogoIconDiv} {
      display: inline;
      height: 58px;
      width: 58px;
    }
    & > ${LogoTextSpan} {
      font-size: 48px;
      margin-left: 0.2em;
      letter-spacing: 0.2em;
    }
  }

  /* Key frames defined here because used below in Large Desktop */
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
      transform: translateX(0.1vw);
    }
  }

  @keyframes FLIP-LOGO-LEFT {
    0% {
      -ms-transform: translateX(30vw); /* IE 9 */
      -webkit-transform: translateX(30vw); /* Chrome, Safari, Opera */
      transform: translateX(30vw);
    }
    1% {
      -ms-transform: translateX(30vw) rotate(0deg);
      -webkit-transform: translateX(30vw) rotate(0deg);
      transform: translateX(30vw) rotate(0deg);
    }
    100% {
      -ms-transform: translateX(0.1vw) rotate(360deg);
      -webkit-transform: translateX(0.1vw) rotate(360deg);
      transform: translateX(0.1vw) rotate(360deg);
    }
  }

  /* ---- LapTop (1366 x ) ---- */
  @media only screen and (min-width: 1366px) {
    ${props =>
      props.runLogoAnim ? "animation: FLIP-LOGO-LEFT 1s ease-out;" : ""}

    & > ${LogoIconDiv} {
      width: var(--header-height-tablet);
      height: var(--header-height-tablet);
      padding-left: 10px;
    }

    & > ${LogoTextSpan} {
      font-size: 48px;
      margin-left: 0.1em;
      letter-spacing: 0.25em;
    }
  }
`
/*
export const SlideLogoDivLeft = keyframes`
  0% {
    margin-left: 35%;
    -ms-transform: rotate(180deg); 
    -webkit-transform: rotate(180deg); 
    transform: rotate(180deg);
    transition: transform 0.2s ease-out;
  }
  100% {
    margin-left: 0px;
  }
`
*/
