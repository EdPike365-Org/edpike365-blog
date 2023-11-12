const path = require(`path`)

exports.createSitePagesFromMDFiles = async (
  arBlogStatusesToShow,
  graphql,
  reporter,
  createPage
) => {
  const template = path.resolve(`./src/templates/site-page/site-page.js`)

  // Limit site pages created from MD.
  // Limit by what folder the MD file is in,
  // and to those with frontmatter "status" in the list of allowed statuses
  const queryResults = await graphql(
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

  if (queryResults.errors) {
    reporter.panicOnBuild(
      `There was an error loading your site MD pages`,
      queryResults.errors
    )
    return
  }

  const nodes = queryResults.data.allMarkdownRemark.nodes
  if (nodes.length > 0) {
    nodes.forEach(node => {
      /*
      TODO FIX 
      gatsby-node-blogposts does not have this error
      though its almost same code?
      
Action createPage was called outside of its expected
asynchronous lifecycle createPages in default-site-plugin.
Ensure that you return a Promise from createPages and are awaiting
any asynchronous method invocations (like graphql or http requests).
For more info and debugging tips: see
https://gatsby.dev/sync-actions
*/

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
