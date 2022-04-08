const path = require(`path`)

exports.getBlogStatusesToShow = strBlogStatusesToShow => {
  // Change the comma seperated list to an array
  const arBlogStatusesToShow = strBlogStatusesToShow.split(",")
  // To write out string '["abc", "xyz"]', call JSON.stringify(arBlogStatusesToShow)
  console.info(
    " gatsby-node.js arBlogStatusesToShow JSON = " +
      JSON.stringify(arBlogStatusesToShow)
  )
  return arBlogStatusesToShow
}

// We use this to create blog pages but also the list of blog summaries
exports.createBlogPages = async (
  arBlogStatusesToShow,
  graphql,
  reporter,
  createPage
) => {
  // Define a template for blog post
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  // limit them to those with frontmatter "status" in the list of allowed statuses
  // NOTE: I'm using a promise chain to show that I know how
  // Whether I use a chain or modern async/await syntax, gatsby is still giving an
  // irritating warning about createPage being used outside default gatsby-node.js
  await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          filter:
          {
            fileAbsolutePath: {regex: "/content/blog/"},
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
  ).then(blogPostResults => {
    if (blogPostResults.errors) {
      reporter.panicOnBuild(
        `There was an error loading your blog posts`,
        blogPostResults.errors
      )
      return
    }

    const posts = blogPostResults.data.allMarkdownRemark.nodes
    console.info(
      "gatsby-node-blogposts.js: got num blog posts = " + posts.length
    )

    // Create blog posts pages
    if (posts.length > 0) {
      posts.forEach((post, index) => {
        // These 2 properties are used by the blog pagination code
        const previousPostId = index === 0 ? null : posts[index - 1].id
        const nextPostId =
          index === posts.length - 1 ? null : posts[index + 1].id

        // `context` is available in the template as a prop and as a variable in GraphQL
        createPage({
          path: "/blog" + post.fields.slug,
          component: blogPostTemplate,
          context: {
            id: post.id,
            previousPostId,
            nextPostId,
          },
        })
      })
    }
  })
}
