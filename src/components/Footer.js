import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

const FootDiv = styled.footer`
  background-color: var(--color-background-paper);
  box-shadow: var(--shape-box-shadow);
  color: var(--color-text-secondary);
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-around;

  z-index: 999;

  grid-area: footer;
`

export default function Footer() {
  return (
    <FootDiv>
      <span>
        © {new Date().getFullYear()}, Built with &nbsp;
        <a href="https://www.gatsbyjs.com">Gatsby v3</a>, (
        {`${process.env.NODE_ENV}`} mode)
      </span>
    </FootDiv>
  )
}
