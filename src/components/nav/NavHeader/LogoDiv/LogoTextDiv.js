import React from "react"
import { css } from "@emotion/react"
import LogoTextSpan from "./LogoTextSpan"
import { Link } from "gatsby"

const logoTextDivCSS = css`
  box-sizing: border-box;
  vertical-align: middle;
`

const logoLinkCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-main);
  text-decoration: none;
`

const LogoTextDiv = () => {
  return (
    <div id="logoTextDiv" css={logoTextDivCSS}>
      <Link css={logoLinkCSS} to="/">
        <LogoTextSpan />
      </Link>
    </div>
  )
}

export default LogoTextDiv
