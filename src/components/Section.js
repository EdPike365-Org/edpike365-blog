import React from "react"
import { css } from "@emotion/react"

const sectionCSS = css`
  color: var(--color-text-secondary);
  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  padding: 10px;
  border-radius: var(--shape-border-radius);
  border: var(--shape-border);
  box-shadow: var(--shape-box-shadow);
`
const Section = ({ title, children }) => {
  return (
    <section css={sectionCSS}>
      <h3 itemProp="headline">{title}</h3>
      {children}
    </section>
  )
}

export default Section
