import React from "react"
import { css } from "@emotion/react"
import { useStaticQuery, graphql } from "gatsby"

// Works with smallest screen width 280. Let parents manipulate as needed.
const logoTextSpanCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 100%;

  color: var(--color-primary-main);
  transition: color 400ms ease-in-out;

  font-family: Arial;
  font-weight: 700;

  /* Height controled by Header */
  /* height: 100%; */

  color: var(--color-primary-main);
  text-decoration: none;

  padding: 0rem;
  margins: 0rem;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  font-size: 34px;
  letter-spacing: 0.04em;

  /* ---- Normal Phones: Show Logo  ---- */
  @media only screen and (min-width: 360px) {
    /* height: var(--header-height-mobile); */
    font-size: 36px;
    letter-spacing: 0.08em;
  }

  /* ---- Larger Phones (540 x ) ---- */
  /* The logo text can spread out some more, more letter spacing */
  @media only screen and (min-width: 540px) {
    font-size: 36px;
    margin-left: 0.15em;
    letter-spacing: 0.2em;
  }

  /* ---- Tablet (700 x ) ---- */
  /* Tablet header height : 64px */
  @media only screen and (min-width: 700px) {
    /* height: var(--header-height-tablet); */
    font-size: 48px;
    margin-left: 0.2em;
    letter-spacing: 0.2em;
  }

  /* ---- LapTop (1366 x ) ---- */
  @media only screen and (min-width: 1366px) {
    font-size: 48px;
    margin-left: 0.1em;
    letter-spacing: 0.25em;
  }
`

const LogoTextSpan = () => {
  const data = useStaticQuery(graphql`
    query MetaQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const logoText = data.site.siteMetadata?.title || `Title`

  return (
    <span id="logoTextSpan" css={logoTextSpanCSS}>
      {logoText}
    </span>
  )
}

export default LogoTextSpan
