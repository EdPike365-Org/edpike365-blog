import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/react"

export default function Footer() {
  const today = new Date()
  const [cyear] = [today.getFullYear()]

  return (
    <footer css={footerCSS}>
      <div css={footerRowCSS}>
          <Link to="/privacy" itemProp="url" css={footerLinkCSS} >Privacy</Link>
          <Link to="/cookie-policy" itemProp="url" css={footerLinkCSS}>Cookies</Link>
          <Link to="/terms-of-service" itemProp="url" css={footerLinkCSS} >Terms</Link>
          <Link to="/contact" itemProp="url" css={footerLinkCSS} >Contact</Link>
      </div>
      <div css={footerRowCSS}>
        <div>
          © {cyear}, Edward Pike - All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

const footerCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  margin: auto;
  background-color: var(--color-background-paper);
  color: var(--color-text-secondary);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  text-align: center;
  font-size: 0.75rem;
  
  //left right padding to reserve space for the floating back to top button
  padding: .5rem 60px;

  z-index: 999;

  /* ---- Larger Phones (540 x ) ---- */
  /* 
  Forcing a min height to support docking the floating scrollToTop button 
  Otherwise, when the footer is wide enough, its gets very short in height.
  */
  @media only screen and (min-width: 540px) {
    min-height: 3rem;
  }
`

const footerRowCSS = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%; 
  padding: .35rem 0;
`

const footerLinkCSS = css`
  margin: 0 .5rem;
`
