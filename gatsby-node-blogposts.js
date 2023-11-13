const path = require(`path`)

//I moved these functions here to clean up gatsby-node.js

exports.getBlogStatusesToShow = strBlogStatusesToShow => {
  let arBlogStatusesToShow = []

  if (
    strBlogStatusesToShow == null ||
    strBlogStatusesToShow == undefined ||
    strBlogStatusesToShow == ''
  ) {
    console.warn(
      ' gatsby-node-blogposts.js: strBlogStatusesToShow is null, undefined or empty. Make sure it is defined in env vars.'
    )
  } else {
    // Change the comma seperated list to an array
    arBlogStatusesToShow = strBlogStatusesToShow.split(',')
    // To write out string '["abc", "xyz"]', call JSON.stringify(arBlogStatusesToShow)
    console.info(
      ' gatsby-node-blogposts.js arBlogStatusesToShow JSON = ' +
        JSON.stringify(arBlogStatusesToShow)
    )
  }

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
  const blogPostTemplate = path.resolve(
    `./src/templates/blog-post/blog-post.js`
  )

  // Get all markdown blog posts sorted by date
  // limit them to those with frontmatter "status" in the list of allowed statuses
  // NOTE: I'm using a promise chain to show that I know how
  // Whether I use a chain or modern async/await syntax, gatsby is still giving an
  // irritating warning about createPage being used outside default gatsby-node.js
  await graphql(
    `
      {
        allMarkdownRemark(
          sort: { frontmatter:{date:ASC} }
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
      'gatsby-node-blogposts.js: got num blog posts = ' + posts.length
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
          path: '/blog' + post.fields.slug,
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

exports.addFiltersToBlogListingPages = (
  page,
  deletePage,
  createPage,
  arBlogStatusesToShow
) => {
  // If a MD blogpost is not in allowed statuses, the pages page for the
  // blogpost will not exist (filtered in createSitePages)
  // HOWEVER, pages that *list* blogposts will still create summaries and links to them
  // So we have to pass in some context variables that are used in the page query
  // TODO: I need to somehow filter them at a higher level

  if (page.path == '/bloglist/') {
    // limit which blog posts appear on the "bloglist" page
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        allowedBlogStatuses: arBlogStatusesToShow,
      },
    })
  } else if (page.path == '/') {
    // limit the number and statuses of blog posts
    // that appear on the Home Page (typically 3)
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
