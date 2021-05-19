import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "@emotion/styled"

const Bio = () => {
  
  const data = useStaticQuery(
    graphql`
    query {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  const BioDiv = styled.div`
    color: var(--color-text-secondary);
    display: flex;
    justify-content: center;
  `
  const ImgDiv = styled.span`
    /* emotion styled does not work with StaticImage */
    /* StaticImage lives inside a div > picture > img */
    padding: 0.5rem;

    & > div > picture > img {
      min-width: 50px;
      border-radius: 100%;
    }
  `

  const TextSpan = styled.span`
    padding: 0.5rem;
  `

  return (
    <BioDiv>
      <ImgDiv>
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["AUTO", "WEBP", "AVIF"]}
          src="../images/profile-pic.png"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
      </ImgDiv>
      <TextSpan>
        {author?.name && (
          <span>
            Written by <strong>{author.name}</strong> {author?.summary || null}
          </span>
        )}
      </TextSpan>
    </BioDiv>
  )
}

export default Bio
