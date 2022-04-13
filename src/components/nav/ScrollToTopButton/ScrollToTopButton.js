import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import { buttonDivCSS, upIconCSS } from "./styles"

export const ScrollToTopButton = ({ targetRef, children }) => {
  const [visible, setVisible] = useState(false)

  const scrollOptions = {
    top: 0,
    left: 0,
    behavior: "smooth",
  }

  const scrollToTop = () => {
    targetRef.current.scroll(scrollOptions)
  }

  const handleKeyDown = e => {
    const eCode = e.code
    switch (eCode) {
      case "Enter":
        scrollToTop()
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

  const toggleVisibleCSS = css`
    ${{ display: visible ? "inline" : "none" }};
  `

  // using a div because button's cursor change hitbox is extended on bottom
  // dont know why. Also, I want to show how to satisfy a11y linter.
  return (
    <div
      css={[buttonDivCSS, upIconCSS, toggleVisibleCSS]}
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
      {children}
    </div>
  )
}

// one way to do css composition with Emotion, but its ugly
// preserving because it might come in handy later
// TODO delete when I move it to a blog post
/*
  <div css={css`
    ${buttonDivCSS};
    ${upIconCSS};
    ${{ display: visible ? "inline" : "none" }};
  `} >
  */
