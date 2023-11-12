import React, { useContext } from "react"
import { NavContext } from "../../../../../contexts/NavContext"
import * as styles from "./styles.module.css"
import LogoDivIcon from "../LogoDivIcon/LogoIconDiv"
import LogoDivText from "../LogoDivText/LogoDivText"

const LogoDiv = () => {

  const { runLogoAnimState } = useContext(NavContext)
  const [runLogoAnim] = runLogoAnimState

  return (
    <div className={`${styles.logoDivCSS}  ${runLogoAnim ? styles.logoAnimation : ""}`}>
      <LogoDivIcon />
      <LogoDivText />
    </div>
  )
}

export default LogoDiv
