import React from "react"
import { css } from "@emotion/react"
import DarkModeToggle from "gatsby-head-style-boss/components/DarkModeToggle"
import SettingsButton from "./buttons/SettingsButton"
import UserButton from "./buttons/UserButton"

const buttonDivRightCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  /* Header's DarkMode Toggle and SettingsButton are hidden */

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

  /* ---- Tablet (700 x ) ---- */
  /* Make buttons 42px square */
  @media only screen and (min-width: 700px) {
    & > .dark-mode-toggle {
      width: 42px;
      height: 42px;
    }
    & > #settingsButton {
      width: 42px;
      height: 42px;
    }
    & > #userButton {
      width: 42px;
      height: 42px;
    }
  }
`

const ButtonDivRight = () => {
  return (
    <div css={buttonDivRightCSS}>
      <DarkModeToggle />
      <SettingsButton />
      <UserButton />
    </div>
  )
}

export default ButtonDivRight
