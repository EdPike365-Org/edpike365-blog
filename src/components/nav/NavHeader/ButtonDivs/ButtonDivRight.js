import React from "react"
import { css } from "@emotion/react"
import DarkModeButton from "../Buttons/DarkModeButton"
import SettingsButton from "../Buttons/SettingsButton"
import UserButtons from "./UserButtons"
import { buttonDivBaseCSS } from "./styles.js"

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
    /* now Settings Button appears */
    & > #settingsButton {
      display: inline-flex;
    }
  }

  /* ---- Larger Phones (540 x ) ---- */
  @media only screen and (min-width: 540px) {
    /* Now DarkMode toggle appears */
    & > #darkModeButton {
      display: inline-flex;
    }
  }
`

export const ButtonDivRight = () => {

  return (
    <div css={[buttonDivBaseCSS, buttonDivRightCSS]}>
      <DarkModeButton />
      <SettingsButton target="site-settings" />
      <UserButtons />
    </div>
  )
}
