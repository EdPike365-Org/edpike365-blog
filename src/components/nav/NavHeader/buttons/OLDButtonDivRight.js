import React from "react"
import { css } from "@emotion/react"
import DarkModeToggle from "gatsby-head-style-boss/components/DarkModeToggle"
import SettingsButton from "./SettingsButton"
import UserButton from "./UserButton"

const divCSS = css`
  display: flex;
  align-items: center;
  justify-content: right;
  flex-direction: row;

  /* this height also controls the height/width of the buttons */
  height: 28px;

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
    height: 36px;
    & > .dark-mode-toggle {
      display: inline-flex;
    }
  }

  /* ---- Tablet (700 x ) ---- */
  /* Make buttons 42px square */
  @media only screen and (min-width: 700px) {
    height: 42px;
    & > .dark-mode-toggle {
      /* width: 42px; */
      /* height: 42px; */
    }
    & > #settingsButton {
      /* width: 42px; */
      /* height: 42px; */
    }
    & > #userButton {
      /* width: 42px; */
      /* height: 42px; */
    }
  }
`

const ButtonDivRight = () => {
  return (
    <div css={divCSS}>
      <DarkModeToggle />
      <SettingsButton />
      <UserButton />
    </div>
  )
}

export default ButtonDivRight
