const path = require(`path`)
const { createFilePath, loadNodeContent } = require(`gatsby-source-filesystem`)
const {
  getBlogStatusesToShow,
  createBlogPages,
} = require(`./gatsby-node-blogposts`)
// We do not need to require dotenv because it was already done in gatsby-config.js

const arBlogStatusesToShow = getBlogStatusesToShow(
  process.env.BLOG_STATUSES_TO_SHOW_LIST
)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  createSitePages(arBlogStatusesToShow, graphql, reporter, createPage)
  createBlogPages(arBlogStatusesToShow, graphql, reporter, createPage)
}

// Create filepaths to each markdown file (blog posts, etc.)
// as each is added to a node in Redux, add the filepath to the node as a field
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

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

  filterBlogListingPages(page, deletePage, createPage, arBlogStatusesToShow)

  /* 
  Since this section will have dynamic content that shouldn’t be rendered statically, 
  you need to exclude it from the build. This indicates that /account is a client-only route.
  page.matchPath is a special key that's used for matching pages only on the client.
    */
  if (page.path.match(/^\/account/)) {
    page.matchPath = "/account/*"

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
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}

const createSitePages = async (
  arBlogStatusesToShow,
  graphql,
  reporter,
  createPage
) => {
  const template = path.resolve(`./src/templates/blog-post.js`)

  // limit them to those with frontmatter "status" in the list of allowed statuses
  const results = await graphql(
    `
      {
        allMarkdownRemark(
          filter: 
            {
              fileAbsolutePath: {regex: "/content/site/"},
              frontmatter: {status: {in: ` +
      JSON.stringify(arBlogStatusesToShow) +
      ` }}
            }
     
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (results.errors) {
    reporter.panicOnBuild(
      `There was an error loading your site MD pages`,
      results.errors
    )
    return
  }

  const nodes = results.data.allMarkdownRemark.nodes
  if (nodes.length > 0) {
    nodes.forEach(node => {
      // `context` is available in the template as a prop and as a variable in GraphQL
      createPage({
        path: node.fields.slug,
        component: template,
        context: {
          id: node.id,
        },
      })
    })
  }
}

const filterBlogListingPages = (
  page,
  deletePage,
  createPage,
  arBlogStatusesToShow
) => {
  if (page.path == "/bloglist/") {
    // limit which blog posts appear on the bloglist page
    // If they are not in allowed statuses, the pages will not exist
    // but the bloglist page will still create summaries and links to them
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        allowedBlogStatuses: arBlogStatusesToShow,
      },
    })
  } else if (page.path == "/") {
    // limit the number and statuses of blog posts
    // that appear on the home page (most recent, typically 3)
    // If they are not in allowed statuses, the pages will not exist
    // but the home page will still create summaries and links to them
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        allowedBlogStatuses: arBlogStatusesToShow,
        limit: 3,
      },
    })
  }
}
