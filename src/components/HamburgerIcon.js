import React from "react"
import styled from "@emotion/styled"

const HamburgerSpan = styled.span`

  padding: 0rem;

  & > svg {
    fill: var(--color-text-secondary);
    stroke: var(--color-text-secondary);
    display: inline-block;
    font-size: inherit;
    height: ${props => (props.fontHeight ? props.fontHeight : "1rem")};
    overflow: visible;
    vertical-align: -0.125em;
  }
`

const HamburgerIcon = props => {
  return (
    <HamburgerSpan fontHeight={props.fontHeight}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="bars"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="svg-inline--fa fa-bars fa-w-14 fa-2x"
      >
        <path

          d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
          className=""
        ></path>
      </svg>
    </HamburgerSpan>
  )
}

export default HamburgerIcon
