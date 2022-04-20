import React from "react"
import { css } from "@emotion/react"
import LogoTextSpan from "./LogoTextSpan"
import LogoTextLink from "./LogoTextLink"

const logoTextDivCSS = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0px 0px;
  padding: 0px 5px;
`

const LogoTextDiv = () => {
  return (
    <div id="logoTextDiv" css={logoTextDivCSS}>
      <LogoTextLink>
        <LogoTextSpan />
      </LogoTextLink>
    </div>
  )
}

export default LogoTextDiv
