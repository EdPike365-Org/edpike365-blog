import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import * as styles from './blog-post.module.css'

import Seo from '../../components/Seo'
import Layout from '../../components/layout/Layout'
import SubscribeWidget from '../../components/forms/SubscribeWidget'
import Bio from '../../components/Bio'

require(`katex/dist/katex.min.css`)

export const Head = ({ data }) => {
  // TODO verify this works, especially for og:image
  const post = data.markdownRemark
  const { ogimage } = post.frontmatter
  // const ogImagePath = ogimage && ogimage.childImageSharp.fixed.src
  const ogImagePath = ogimage && getSrc(ogimage)
  // https://juliangaramendy.dev/blog/custom-open-graph-images-in-gatsby-blog

  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      image={ogImagePath}
    />
  )
}

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const title = post.frontmatter.title || post.fields.slug
  const postDate = post.frontmatter.date

  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className={`${styles.blogHeader}`}>
          <h1 itemProp="headline">{title}</h1>
          <span className="overline">{postDate}</span>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <SubscribeWidget />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul className={`${styles.blogPostListUL}`}>
          <li>
            {previous && (
              <Link to={'/blog' + previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={'/blog' + next.fields.slug} rel="next">
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
