import React from "react"
import styled from "@emotion/styled"
import { useStaticQuery, graphql } from "gatsby"

// Works with smallest screen width 280. Let parents manipulate as needed.
export const LogoTextSpan = styled.span`
  color: var(--color-primary-main);
  transition: color 400ms ease-in-out;
  
  font-family: Arial;
  font-weight: 700;
  font-size: 25px;

  letter-spacing: 0.25em;
  /* added to balance out the letter-spacing trailing space */
  /*padding-left: 0.4rem; */
 
`

const LogoText = () => {
  
  const data = useStaticQuery(graphql`
    query MetaQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const logoText = data.site.siteMetadata?.title || `Title`

  return <LogoTextSpan>{logoText}</LogoTextSpan>
}

export default LogoText
