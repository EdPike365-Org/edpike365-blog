import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const HomePage = ({data, pageContext, location }) => {
  
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const numPostsToShow = pageContext.limit
  const totalCount = data.allMarkdownRemark.totalCount

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Bio />
      Welcome to my Portfolio. It's just a blog for now, but big changes are coming! It's based on Gatsby v3 Starter Blog and I'll be documenting how I customize it.
      <br />
      <br />
      {numPostsToShow} Most Recent Posts ( <Link to="/bloglist/">See all {totalCount}</Link>  )
      <hr></hr>
      <ol style={{ listStyle: `none` }}>
        {
        posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query HomePageQuery(
    $allowedBlogStatuses: [String]
    $limit: Int
    ){
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {status: { in: $allowedBlogStatuses  }}}
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
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