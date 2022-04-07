import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import { FaArrowCircleUp } from "@react-icons/all-files/fa/FaArrowCircleUp"
import { buttonDivCSS, upIconCSS } from "./styles"

export const ScrollToTopButton = ({ targetRef }) => {
  const [visible, setVisible] = useState(false)

  const scrollOptions = {
    top: 0,
    left: 0,
    behavior: "smooth",
  }

  const scrollToTop = () => {
    targetRef.current.scroll(scrollOptions)
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

  // defining this css here because it refers to visible variable
  const toggleVisibleCSS = css`
    ${{ display: visible ? "inline" : "none" }};
  `

  return (
    <div css={[buttonDivCSS, upIconCSS, toggleVisibleCSS]}>
      <FaArrowCircleUp onClick={scrollToTop} />
    </div>
  )
}

// one way to do css composition, but its ugly
// preserving because it might come in handy later
// TODO delete when I move it to a blog post
/*
  <div css={css`
    ${buttonDivCSS};
    ${upIconCSS};
    ${{ display: visible ? "inline" : "none" }};
  `} >
  */
