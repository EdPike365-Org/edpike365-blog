import React from "react"
import { css } from "@emotion/react"
import HamburgerButton from "./HamburgerButton"
import DarkModeButton from "./DarkModeButton"
import SettingsButton from "./SettingsButton"
import UserButton from "./UserButton"

const buttonDivBaseCSS = css`
  box-sizing: border-box;

  display: flex;
  align-items: center;
  flex-direction: row;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  /* this height also controls the height/width of the buttons */
  /* TODO get height and media query values from main CSS variables */
  height: 100%;

  /* ---- Normal Phones: Show Logo (320 x ) ---- */
  @media only screen and (min-width: 320px) {
    height: 100%;
  }

  /* ---- Larger Phones (540 x ) ---- */
  @media only screen and (min-width: 540px) {
    height: 100%;
  }

  /* ---- Tablet (700 x ) ---- */
  @media only screen and (min-width: 700px) {
    height: 100%;
  }
`

const buttonDivLeftCSS = css`
  justify-content: left;

  /* ---- LapTop (1366 x ) ---- */
  /* Navbar permanently shows. Hamburger disappears. */
  @media only screen and (min-width: 1366px) {
    display: none;
    & > #hamburgerButton {
      /* display: none; */
    }
    /* TODO: Show more major nav links, like in Vice.com */
  }
`

export const ButtonDivLeft = () => {
  return (
    <div css={[buttonDivBaseCSS, buttonDivLeftCSS]}>
      <HamburgerButton />
    </div>
  )
}

const buttonDivRightCSS = css`
  justify-content: right;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  /* DarkMode Toggle and SettingsButton are hidden */

  /* We are doing it as a child so not every instance of DarkMode toggle disappears */
  & > #darkModeButton {
    display: none;
  }

  & > #settingsButton {
    display: none;
  }

  @media only screen and (min-width: 411px) {
    & > #settingsButton {
      display: inline-flex;
    }
  }

  /* ---- Larger Phones (540 x ) ---- */
  /* Display DarkMode toggle */
  @media only screen and (min-width: 540px) {
    & > #darkModeButton {
      display: inline-flex;
    }
  }
`

export const ButtonDivRight = () => {
  return (
    <div css={[buttonDivBaseCSS, buttonDivRightCSS]}>
      <DarkModeButton />
      <SettingsButton />
      <UserButton />
    </div>
  )
}
