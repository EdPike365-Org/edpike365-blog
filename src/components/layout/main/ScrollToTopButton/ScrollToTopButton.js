import React, { useState, useEffect } from "react"
import * as styles from "./ScrollToTopButton.module.css"

const scrollOptions = {
  top: 0,
  left: 0,
  behavior: "smooth",
}

export const ScrollToTopButton = ({ targetRef, children }) => {
  
  const [visible, setVisible] = useState(false)

  const scrollToTop = () => {
    targetRef.current.scroll(scrollOptions)
  }

  const handleKeyDown = e => {
    const eCode = e.code
    switch (eCode) {
      case "Enter":
        scrollToTop(targetRef)
        break

      default:
      //do nothing
    }
  }

  useEffect(() => {
    // saved to const here to make sure the cleanup works
    const targetComp = targetRef.current

    // Defined here because it is a dependency of the useEffect hook
    // and we dont want to re-render the component every time its called
    const toggleVisible = () => {
      const scrolled = targetComp.scrollTop
      //console.log("scrolled: " + scrolled)
      if (scrolled > 300) {
        setVisible(true)
      } else if (scrolled <= 300) {
        setVisible(false)
      }
    }

    targetComp.addEventListener("scroll", toggleVisible)

    return () => {
      targetComp.removeEventListener("scroll", toggleVisible)
    }

  }, [targetRef])
  
  const displayStyle = visible ? {display: "inline"} : {display: "none"}
  
  // using a div because button's cursor change hitbox is extended on bottom
  // dont know why. Also, I want to show how to satisfy a11y linter.
  return (
    <div
      className={`${styles.buttonDivCSS} ${styles.upIconCSS} scroll-to-top-button`}
      style={displayStyle}
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
      {children}
    </div>
  )
}

