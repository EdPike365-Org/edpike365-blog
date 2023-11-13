import React from "react"
import * as styles from "./styles.module.css"
import LogoDivTextSpan from "./LogoDivTextSpan"
import LogoDivTextLink from "./LogoDivTextLink"

const LogoDivText = () => {
  return (
    <div 
      id="logoTextDiv" 
      className={styles.logoTextDivCSS}
    >
      <LogoDivTextLink>
        <LogoDivTextSpan />
      </LogoDivTextLink>
    </div>
  )
}

export default LogoDivText
