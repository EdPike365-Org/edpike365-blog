import React from "react"
import * as styles from "./AppWrapper.module.css"

//https://css-tricks.com/best-way-implement-wrapper-css/

const AppWrapper = ({ children }) => {
  return <div className={styles.wrapperDiv} >{children}</div>
}

export default AppWrapper
