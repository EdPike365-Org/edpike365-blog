import React from "react"
import styled from "@emotion/styled"

const FootDiv = styled.footer`
  margin: auto;
  background-color: var(--color-background-paper);
  color: var(--color-text-secondary);

  text-align: center;
  font-size: 0.75rem;
  padding: 1rem 0.5rem;
  z-index: 999;
`

export default function Footer() {
  const today = new Date()
  const [cyear] = [today.getFullYear()]

  return (
    <FootDiv>
      <span>
        © {cyear}, Edward Pike
        <br />
        Built with <a href="https://www.gatsbyjs.com">Gatsby v4</a> in{" "}
        {`${process.env.NODE_ENV}`} mode.
      </span>
    </FootDiv>
  )
}
