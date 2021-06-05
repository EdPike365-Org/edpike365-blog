import React from "react"
import styled from "@emotion/styled"
import { useStaticQuery, graphql } from "gatsby"

const LogoTextSpan = styled.span`
  color: var(--color-primary-dark);

  font-family: Arial;
  font-weight: 700;
  font-size: 3.052rem;

  letter-spacing: 0.4rem;
  padding-left: 0.4rem; /* added to balance out the letter-spacing trailing space */

  /* desktop */
  @media only screen and (min-width: 1280px) {
  }
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
