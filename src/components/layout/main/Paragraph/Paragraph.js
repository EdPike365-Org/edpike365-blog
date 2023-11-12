import React from "react"
import * as styles from "./Paragraph.module.css"

const Paragraph = ({ children }) => {
    return (
        <p className={styles.pStyle}>
            {children}
        </p>
    )
}

export default Paragraph
