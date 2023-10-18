import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/react"

const logoIconLinkCSS = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-primary-main);
  text-decoration: none;
`

const LogoIconLink = ({ children }) => {
  return (
    <Link css={logoIconLinkCSS} to="/" aria-label="EdPike365 Home Page" >
      {children}
    </Link>
  )
}

export default LogoIconLink
