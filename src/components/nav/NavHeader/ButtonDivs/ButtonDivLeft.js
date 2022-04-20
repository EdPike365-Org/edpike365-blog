import React from "react"
import { css } from "@emotion/react"
import { buttonDivBaseCSS } from "./styles.js"
import HamburgerButton from "../Buttons/HamburgerButton"

const buttonDivLeftCSS = css`
  justify-content: left;

  /* ---- LapTop (1366 x ) ---- */
  /* Now Navbar permanently shows. Hamburger disappears. */
  @media only screen and (min-width: 1366px) {
    display: none;
    /* TODO: Show more major nav links, like in Vice.com */
  }
`

export const ButtonDivLeft = () => {
  return (
    <div css={[buttonDivBaseCSS, buttonDivLeftCSS]}>
      <HamburgerButton />
    </div>
  )
}
