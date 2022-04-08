import React from "react"
import { css } from "@emotion/react"

const footerCSS = css`
  display: flex;

  margin: auto;
  background-color: var(--color-background-paper);
  color: var(--color-text-secondary);

  text-align: center;
  font-size: 0.75rem;
  padding: 0 0;
  z-index: 999;

  /* ---- Larger Phones (540 x ) ---- */
  @media only screen and (min-width: 540px) {
    height: 70px;
  }

  /* ---- Tablet (700 x ) ---- */
  @media only screen and (min-width: 700px) {
    height: 70px;
  }
`

// We need to resrve space for the floating back to top button
// TODO set the BackToTop button locations in the CSS file for universal reference
const spacerDivCSS = css`
  width: 75px;
`

const spanCSS = css`
  margin: auto;
`

export default function Footer() {
  const today = new Date()
  const [cyear] = [today.getFullYear()]

  return (
    <footer css={footerCSS}>
      <div css={spacerDivCSS}></div>
      <span css={spanCSS}>
        © {cyear}, Edward Pike
        <br />
        Built with <a href="https://www.gatsbyjs.com">Gatsby v4</a> in{" "}
        {`${process.env.NODE_ENV}`} mode.
      </span>
      <div css={spacerDivCSS}></div>
    </footer>
  )
}
