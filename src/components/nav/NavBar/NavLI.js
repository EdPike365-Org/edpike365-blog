import React from "react"
import { css } from "@emotion/react"

/* NavLI are used by the SubUL and the button expandable component */
const navLI = css`
  padding: 0.5rem 0.5rem 0.5rem 1rem;
`

export const NavLI = props => {
  return <li css={navLI}>{props.children}</li>
}
