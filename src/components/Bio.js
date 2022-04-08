import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

const Bio = () => {
  const data = useStaticQuery(
    graphql`
      query BioQuery {
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
    `
  )

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  const BioDiv = styled.div`
    color: var(--color-text-primary);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  const TextSpan = styled.span`
    padding: 0.5rem;
  `
  /* 
  TODO: move this comment to blog
  Emotion styled(StaticImage) does not work because of the fancy code down in StaticImage
   I tried to create a css class and pass in the name to className, but that does not work.
   Emotion has a very small note that if you are using css from @emotion/react, the css class name is not defreffed, it is a property on an object
   So I tried passing in myCSSClass.name. Still did not work !!!!
   It took me  awhile to figure out how to use Emotion css in StaticImage. Emotion site docs were not helpful.
   For example, you do not need to add any jsx anotation as desribed here https://emotion.sh/docs/introduction
   The trick was to NOT use className={css``}, but css={css``}. The css is turned into "className" by Emotion.
   Answer was here https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/reference/built-in-components/gatsby-plugin-image.md
  */
  return (
    <BioDiv>
      <StaticImage
        css={css`
          margin-right: 0.2rem;
          margin-left: 0.5rem;
          margin-bottom: 0rem;
          min-width: 50px;
          border-radius: 20%;
        `}
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
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
