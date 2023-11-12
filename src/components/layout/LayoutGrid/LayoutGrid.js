import React from "react"
import * as styles from "./LayoutGrid.module.css"

const LayoutGrid = ({ children }) => {
  return <div className={styles.globalGridDiv} >{children}</div>
}

export default LayoutGrid
