import React, { useRef } from "react"
import * as styles from "./Main.module.css"
import Footer from "../Footer"
import ScrollToTopButton from "../ScrollToTopButton"
import { FaArrowCircleUp } from "@react-icons/all-files/fa/FaArrowCircleUp"

// This is the main content area
const Main = ({ children, suppressFooter }) => {
  const mainRef = useRef(null)

  return (
    <main ref={mainRef} className={styles.main}>
      {children}
      { suppressFooter ? null : <Footer />}
      <ScrollToTopButton targetRef={mainRef}>
        <FaArrowCircleUp />
      </ScrollToTopButton>  
    </main>
  )

}

export default Main
