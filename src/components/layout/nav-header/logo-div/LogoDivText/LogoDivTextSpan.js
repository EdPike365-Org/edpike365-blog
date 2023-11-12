import React from "react"
import * as styles from "./styles.module.css"
import { useStaticQuery, graphql } from "gatsby"

const LogoDivTextSpan = () => {

  const data = useStaticQuery(graphql`
    query MetaQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const logoText = data.site.siteMetadata?.title || `Title`

  return (
    <span id="logoTextSpan" className={styles.logoTextSpanCSS}>
      {logoText}
    </span>
  )
}

export default LogoDivTextSpan
