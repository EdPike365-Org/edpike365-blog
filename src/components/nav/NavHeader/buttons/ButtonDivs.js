import React from "react"
import { css } from "@emotion/react"
import HamburgerButton from "./HamburgerButton"
import DarkModeToggle from "gatsby-head-style-boss/components/DarkModeToggle"
import SettingsButton from "./SettingsButton"
import UserButton from "./UserButton"

const buttonDivBaseCSS = css`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: row;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  /* this height also controls the height/width of the buttons */
  height: 28px;

  /* ---- Normal Phones: Show Logo (320 x ) ---- */
  @media only screen and (min-width: 320px) {
  }

  /* ---- Larger Phones (540 x ) ---- */
  @media only screen and (min-width: 540px) {
    height: 36px;
  }

  /* ---- Tablet (700 x ) ---- */
  @media only screen and (min-width: 700px) {
    height: 42px;
  }
`

const buttonDivLeftCSS = css`
  /* ---- Tablet (700 x ) ---- */
  /* Ham button gets bigger (other buttons handled by ButtonDivRight) */
  @media only screen and (min-width: 700px) {
  }

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
  /* Header's DarkMode Toggle and SettingsButton are hidden */

  & > .dark-mode-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 5px;
    margin: 3px;
    height: 100%;
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  /* We are doing it as a child so not every instance of DarkMode toggle disappears */
  & > .dark-mode-toggle {
    display: none;
  }

  & > #settingsButton {
    display: none;
  }

  /* ---- Normal Phones: Show Logo (320 x ) ---- */
  /* Display SettingsButton */
  @media only screen and (min-width: 320px) {
    & > #settingsButton {
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
`

export const ButtonDivRight = () => {
  return (
    <div css={[buttonDivBaseCSS, buttonDivRightCSS]}>
      <DarkModeToggle />
      <SettingsButton />
      <UserButton />
    </div>
  )
}
