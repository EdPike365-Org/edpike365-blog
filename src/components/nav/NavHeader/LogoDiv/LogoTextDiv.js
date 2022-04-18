import React from "react"
import { css } from "@emotion/react"
import LogoTextSpan from "./LogoTextSpan"
import { Link } from "gatsby"

const logoTextDivCSS = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0px 0px;
  padding: 0px 5px;
`

const logoLinkCSS = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-main);
  text-decoration: none;
  background-color: yellow;
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
