import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author {
            name
            summary
          }
          description
          siteUrl
          image
          social {
            twitter
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}
