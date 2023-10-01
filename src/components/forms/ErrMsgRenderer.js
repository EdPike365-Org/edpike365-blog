import React from "react"
import { css } from "@emotion/react"

const myCSS = css`
  color: var(--color-error-dark);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
  font-style: bold;
`

const ErrMsgRenderer = ( message ) => {

    return (
        <div css={myCSS}>{message}&nbsp;&nbsp;</div>
    )
}

export default ErrMsgRenderer