import * as React from "react"
import { Link, graphql } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
import styled from "@emotion/styled"
import "./styles.css"

import SubscribeWidget from "../components/layout/SubscribeWidget"
import Bio from "../components/Bio"
import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"

require(`katex/dist/katex.min.css`)

const BlogHeader = styled.header`
  & > h1 {
    margin-top: 0rem;
    margin-bottom: 0.5rem;
    font-weight: var(--font-weight-light);
    text-align: center;
  }
`

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const title = post.frontmatter.title || post.fields.slug
  const postDate = post.frontmatter.date

  const { previous, next } = data
  const { ogimage } = post.frontmatter
  // const ogImagePath = ogimage && ogimage.childImageSharp.fixed.src
  const ogImagePath = ogimage && getSrc(ogimage)
  // https://juliangaramendy.dev/blog/custom-open-graph-images-in-gatsby-blog

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={ogImagePath}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <BlogHeader>
          <h1 itemProp="headline">{title}</h1>
          <span className="overline">{postDate}</span>
        </BlogHeader>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr/>
        <SubscribeWidget/>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={"/blog" + previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"/blog" + next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
