import React from "react"
import { css } from "@emotion/react"

const requiredCSS = css`
  color: var(--color-error-dark);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
  font-style: bold;
  
  text-align: center;

  font-size: 1rem;
  margin: 0 0;

  min-height: 1rem;
  display: inline-flex;
  align-items: center;

`

export default function Required() {

    return (
        <span css={requiredCSS}>&nbsp;&#10033;&nbsp;</span>
    )
}
