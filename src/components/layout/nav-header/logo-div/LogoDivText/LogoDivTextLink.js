import React from "react"
import { Link } from "gatsby"
import * as styles from "./styles.module.css"

const LogoDivTextLink = ({ children }) => {
  return (
    <Link className={styles.logoTextLinkCSS} to="/" aria-label="EdPike365 Home Page">
      {children}
    </Link>
  )
}

export default LogoDivTextLink
