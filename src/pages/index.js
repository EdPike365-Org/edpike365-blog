import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "@emotion/styled"

import Bio from "../components/Bio"
import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"
import BlogPostSummary from "../components/BlogPostSummary"

// Gatsby auto passes in location object,
// but only for pages in "pages" and "templates", not "components"
const HomePage = ({ data, pageContext, location }) => {
  const numPostsToShow = pageContext.limit
  const posts = data.allMarkdownRemark.nodes
  const totalCount = data.allMarkdownRemark.totalCount

  const P = styled.p`
    color: var(--color-text-primary);
    font-size: 1.5rem;
    transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
  `

  /* this uses the "props to className" override functionality of Emotion */
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
        Welcome to my personal site! 
        <br/>
        It is 3 things:
        <li>A blog.</li>
        <li>A portfolio.</li>
        <li>A training set for "AI me".</li>
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
      <br />
      Last Built: {data.currentBuildDate.currentDate}
      <br/>
      Date formatting provided by my custom NPM package <a href="https://www.npmjs.com/package/gatsby-source-build-date">gatsby-source-build-date</a>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query HomePageQuery($allowedBlogStatuses: [String], $limit: Int) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/blog/" },
        frontmatter: { status: { in: $allowedBlogStatuses } }
      }
      sort: { frontmatter:{date:DESC}}
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
    currentBuildDate {
      currentDate
    }
  }
`
