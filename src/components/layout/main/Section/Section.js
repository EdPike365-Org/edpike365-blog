import React from "react"
import * as styles from "./Section.module.css"

const Section = ({ title, children }) => {
  return (
    <section className={styles.sectionCSS}>
      <h3 itemProp="headline">{title}</h3>
      {children}
    </section>
  )
}

export default Section
