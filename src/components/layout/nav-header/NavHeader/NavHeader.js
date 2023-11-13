import React from "react"
import * as styles from "./styles.module.css"
import LogoDiv from "../logo-div/LogoDiv"
import { ButtonDivLeft } from "../button-divs/ButtonDivLeft"
import { ButtonDivRight } from "../button-divs/ButtonDivRight"

const Header = () => {
  //TODO add search icon next to hamburger
  //TODO add settings icon next to darkmode toggle

  return (
    <header id="mainHeader" className={styles.headerCSS}>
      <ButtonDivLeft />
      <LogoDiv />
      <ButtonDivRight />
    </header>
  )
}

export default Header
