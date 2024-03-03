import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/common/Seo'
import Layout from '../components/layout/Layout'
import BlogPostSummary from '../components/common/BlogPostSummary'
import Bio from '../components/common/Bio'
import * as styles from './index.module.css'

export const Head = () => <Seo title="Home" />

//const HomePage = ({ data, pageContext, location }) => {
const Home = ({ data, pageContext, location }) => {
  const numPostsToShow = pageContext.limit
  const posts = data.allMarkdownRemark.nodes
  const totalCount = data.allMarkdownRemark.totalCount

  return (
    <Layout>
      <div className={styles.titleDiv}>
        <p>Welcome to my personal site!</p>
        <p>It is 3 things:</p>
        <ul>
          <li>A blog.</li>
          <li>A portfolio.</li>
          <li>A training set for my AI twin.</li>
        </ul>
      </div>
      {numPostsToShow} Most Recent Posts ({' '}
      <Link to="/bloglist/" className={`${styles.linkToBlogList}`}>
        See all {totalCount}
      </Link>
      )
      <hr />
      {/* Duplicate components need unique key to keep react from complaining */}
      {posts.map(post => {
        return <BlogPostSummary key={post.fields.slug} post={post} />
      })}
      <Bio />
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query HomePageQuery($allowedBlogStatuses: [String], $limit: Int) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/blog/" }
        frontmatter: { status: { in: $allowedBlogStatuses } }
      }
      sort: { frontmatter: { date: DESC } }
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
