import React from "react"
import { Link } from "gatsby"
import * as styles from "./Footer.module.css"

const Footer = () => {

  const today = new Date()
  const [cyear] = [today.getFullYear()]

  return (
    <footer className={styles.footerCSS}>
      <div className={styles.footerRowCSS}>
          <Link to="/privacy" itemProp="url" className={styles.footerLinkCSS} >Privacy</Link>
          <Link to="/cookie-policy" itemProp="url" className={styles.footerLinkCSS} >Cookies</Link>
          <Link to="/terms-of-service" itemProp="url" className={styles.footerLinkCSS} >Terms</Link>
          <Link to="/contact" itemProp="url" className={styles.footerLinkCSS} >Contact</Link>
      </div>
      <div className={styles.footerRowCSS}>
        <div>
          © {cyear}, Edward Pike - All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
