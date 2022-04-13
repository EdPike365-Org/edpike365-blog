import React, { useRef } from "react"
import { css } from "@emotion/react"
import Footer from "./Footer"
import ScrollToTopButton from "../nav/ScrollToTopButton"
import { FaArrowCircleUp } from "@react-icons/all-files/fa/FaArrowCircleUp"

// This is the main content area

const mainCSS = css`
  grid-area: main;

  width: 100%;
  overflow: auto;

  background-color: var(--color-background-default);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  min-width: 275px;
  padding: 0px 10px 5px 10px;

  /* ---- Normal Phones (320 x ) ---- */
  @media only screen and (min-width: 320px) {
    padding: 0px 20px 10px 20px;
  }

  /* ---- Larger Phones (540 x ) ---- */
  @media only screen and (min-width: 540px) {
    padding: 0px 20px 10px 20px;
  }

  /* ---- Tablet (700 x ) ---- */
  @media only screen and (min-width: 700px) {
    padding: 0px 25px 10px 25px;
  }

  @media only screen and (min-width: 1024px) {
    padding: 0px 25px 10px 25px;
  }

  /* ---- LapTop (1366 x ) ---- */
  /* Left nav will always be open (handled by nav component) */
  @media only screen and (min-width: 1366px) {
  }
`

const Main = ({ children }) => {
  const mainRef = useRef(null)

  return (
    <main ref={mainRef} css={mainCSS}>
      {children}
      <Footer />
      <ScrollToTopButton targetRef={mainRef}>
        <FaArrowCircleUp />
      </ScrollToTopButton>
    </main>
  )
}

export default Main
