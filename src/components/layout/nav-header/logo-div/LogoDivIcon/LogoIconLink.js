import React from "react"
import { Link } from "gatsby"
import * as styles from "./styles.module.css"

const LogoIconLink = ({ children }) => {
  return (
    <Link className={`${styles.logoIconLinkCSS} logo-icon-link`} to="/" aria-label="EdPike365 Home Page" >
      {children}
    </Link>
  )
}

export default LogoIconLink
