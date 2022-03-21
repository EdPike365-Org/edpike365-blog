const path = require(`path`)
const { createFilePath, loadNodeContent } = require(`gatsby-source-filesystem`)

// We do not need to require dotenv because it was already done in gatsby-config.js

// We use this to create blog pages but also the list of blog summaries
// CLEAN CODE: 1 operation per line, aids debugging
const strBlogStatusesToShow = process.env.BLOG_STATUSES_TO_SHOW_LIST
// Change the comma seperated list to an array
const arBlogStatusesToShow = strBlogStatusesToShow.split(",")
// To write out string '["abc", "xyz"]', call JSON.stringify(arBlogStatusesToShow)
console.info(
  " gatsby-node.js arBlogStatusesToShow JSON = " +
    JSON.stringify(arBlogStatusesToShow)
)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  // limit them to those with frontmatter "status" in the list of allowed statuses
  const blogPostResults = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          filter: {frontmatter: {status: {in: ` +
      JSON.stringify(arBlogStatusesToShow) +
      ` }}}
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

  if (blogPostResults.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      blogPostResults.errors
    )
    return
  }

  const posts = blogPostResults.data.allMarkdownRemark.nodes
  console.info("gatsby-node.js: got num blog posts = " + posts.length)

  // Create blog posts pages
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      // These 2 properties are used by the blog pagination code
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      // `context` is available in the template as a prop and as a variable in GraphQL
      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

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

// limit which blog posts appear on home page or bloglist page
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  if (page.path == "/bloglist/") {
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        allowedBlogStatuses: arBlogStatusesToShow,
      },
    })
  } else if (page.path == "/") {
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
