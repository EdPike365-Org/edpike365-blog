const { createFilePath } = require(`gatsby-source-filesystem`)

// TODO You can author gatsby-config and gatsby-node in ESM syntax.
// This feature was added in gatsby@5.3.0.

const {
  getBlogStatusesToShow,
  createBlogPages,
  addFiltersToBlogListingPages,
} = require(`./gatsby-node-blogposts`)

const { createSitePagesFromMDFiles } = require(`./gatsby-node-mdsitepages`)

// We do not need to require/import dotenv because it was already done in gatsby-config.js
// It loads .env.production or .env.development depending on the build mode
const arBlogStatusesToShow = getBlogStatusesToShow(
  process.env.BLOG_STATUSES_TO_SHOW_LIST
)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  await createSitePagesFromMDFiles(
    arBlogStatusesToShow,
    graphql,
    reporter,
    createPage
  )

  await createBlogPages(arBlogStatusesToShow, graphql, reporter, createPage)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Create filepaths to each markdown file (blog posts, etc.)
  // As each file is added to a node in Redux, add the filepath to the node as a field
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Some pages have lists of blogs and need GraphQL filters injected
  addFiltersToBlogListingPages(
    page,
    deletePage,
    createPage,
    arBlogStatusesToShow
  )

  /*
  Since this section will have dynamic content that shouldn’t be rendered statically,
  you need to exclude it from the build. This indicates that /account is a client-only route.
  page.matchPath is a special key that's used for matching pages only on the client.
    */
  if (page.path.match(/^\/account/)) {
    page.matchPath = '/account/*'

    // Update the page.
    createPage(page)
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      kicker: String
      title: String
      subtitle: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
