import AccountButtons from "./buttons/AccountButtons"
import React from "react"
import DarkModeToggleDiv from "./buttons/DarkModeToggleDiv"
import SettingsButton from "./buttons/SettingsButton"

import * as styles from "./ButtonDivs.module.css"

const name = `ButtonDivRight`

export const ButtonDivRight = () => {

  return (
    <div id="buttonDivRight" className={`${styles.buttonDivBaseCSS} ${styles.buttonDivRightCSS} button-div-right`} >
      <DarkModeToggleDiv />
      <SettingsButton target="/site-settings/" />
      <AccountButtons />
    </div>
  )

}
