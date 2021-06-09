import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "@emotion/styled"

import Bio from "../components/Bio"
import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"
import BlogPostSummary from "../components/BlogPostSummary"

// location is auto passed in, but only for pages in "pages" and "templates", not "components"
const HomePage = ({ data, pageContext, location }) => {
  const numPostsToShow = pageContext.limit
  const posts = data.allMarkdownRemark.nodes
  const totalCount = data.allMarkdownRemark.totalCount

  const P = styled.p`
    color: var(--color-text-primary);
    font-size: 1.5rem;
    transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
  `

  /* this uses the props to className overrided functionality of Emotion */
  const StyledLink = styled(props => <Link {...props} />)`
    color: var(--color-primary-dark);
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
  `

  return (
    <Layout location={location}>
      <Seo title="Home" />
      <P>
        Welcome to my Portfolio. It's just a blog for now, but big changes are
        coming! It's based on Gatsby v3 Starter Blog and I'll be documenting how
        I customize it.
      </P>
      {numPostsToShow} Most Recent Posts ({" "}
      <StyledLink to="/bloglist/">See all {totalCount}</StyledLink> )
      <hr />
      {/* Duplicate components need unique key to keep react from complaining */}
      {posts.map(post => {
        return <BlogPostSummary key={post.fields.slug} post={post} />
      })}
      <br />
      <Bio />
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query HomePageQuery($allowedBlogStatuses: [String], $limit: Int) {
    allMarkdownRemark(
      filter: { frontmatter: { status: { in: $allowedBlogStatuses } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
    ) {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          status
          description
        }
      }
    }
  }
`
