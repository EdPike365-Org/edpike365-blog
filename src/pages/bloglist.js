import * as React from "react"
import { graphql } from "gatsby"

import Bio from "../components/Bio"
import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"
import BlogPostSummary from "../components/BlogPostSummary"

const BlogList = ({data, location }) => {
  
  const posts = data.allMarkdownRemark.nodes
  const totalCount = data.allMarkdownRemark.totalCount

  if (posts.length === 0) {
    return (
      <Layout location={location} >
        <Seo title="All Blog Posts" />
        <Bio />
        <p>
          No blog posts found. 
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} >
      <Seo title="All Blog Posts" />
      <h2>All {totalCount} Blog Entries</h2>
      Ordered by most recent.
      <ol style={{ listStyle: `none`, paddingInlineStart: `0px` }}>
        {
        posts.map(post => {
          return (
            <li key={ post.fields.slug } ><BlogPostSummary  post={post} /></li>
          )         
        })}
      </ol>
    </Layout>
  )
}

export default BlogList

export const pageQuery = graphql`
  query BlogListQuery($allowedBlogStatuses: [String]){
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {status: { in: $allowedBlogStatuses  }}}
      sort: { fields: [frontmatter___date], order: DESC }
      ){
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