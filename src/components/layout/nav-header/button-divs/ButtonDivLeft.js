import * as styles from "./ButtonDivs.module.css"
import React from "react"
import NavBarToggleButton from "./buttons/NavBarToggleButton"


export const ButtonDivLeft = () => {

  return (
    <div id="buttonDivLeft" className={`${styles.buttonDivBaseCSS} ${styles.buttonDivLeftCSS} button-div-left`}>
      <NavBarToggleButton />
    </div>
  )

}
