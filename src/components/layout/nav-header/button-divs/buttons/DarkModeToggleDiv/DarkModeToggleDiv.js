import React from "react"
import * as styles from "../Buttons.module.css"
import * as darkModeToggleStyles from "./DarkModeToggleDiv.module.css"
import DarkModeToggle from "gatsby-head-style-boss/components/DarkModeToggle"

const DarkModeToggleDiv = () => {
  return (
    <div id="darkModeToggleDiv" title="Dark Mode" className={`${styles.commonButtonCSS} ${darkModeToggleStyles.darkModeToggleDivCSS} dark-mode-toggle-div`}>
      <DarkModeToggle />
    </div>
  )
}

export default DarkModeToggleDiv
