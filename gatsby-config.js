require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// NOTES:
// Gatsby CLI location, etc: npm list -g --depth 0
// webpack.config.js is in C:\Users\EdPike365\code\edpike365-blog\node_modules\gatsby\dist\utils
// How to modify gatsby webpack: https://gist.github.com/m-allanson/8fc8943f621a6e5460fb9aa65d2451a9
/*
  flags: {
    DEV_SSR: true
  },
*/
module.exports = {
  siteMetadata: {
    title: `EdPike365`,
    author: {
      name: `EdPike365`,
      summary: `: Full Stack, DevOps, Tech Educator, Science Enthusiast.`,
    },
    description: `Portfolio and blog about programming, Gatsby, technology, science.`,
    siteUrl: `https://www.edpike365.com/`,
    monetization: "$ilp.uphold.com/yLBeLwUyE2A2",
    social: {
      twitter: process.env.TWITTER,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-head-style-boss`,
      options: {
        config: {
          minifyBrowserFunction: false,
          styleConfigs: [
            {
              key: "normalize",
              displayName: "Normalize2 Reset",
              alwaysEnabled: true,
              componentType: "STYLE",
              crossorigin: "false",
              pathToCSSFile: "./src/styles/normalize2.css",
            },
            {
              key: "core",
              displayName: "Core Theme",
              alwaysEnabled: true,
              componentType: "STYLE",
              crossorigin: "false",
              pathToCSSFile: "./src/styles/coreTheme.css",
              minify: true,
            },
            {
              key: "light",
              displayName: "Default, Light Theme",
              alwaysEnabled: false,
              uses: "default",
              componentType: "STYLE",
              pathToCSSFile: "./src/styles/lightTheme.css",
              minify: false,
            },
            {
              key: "dark",
              displayName: "Dark Theme",
              alwaysEnabled: false,
              uses: "dark",
              componentType: "STYLE",
              pathToCSSFile: "./src/styles/darkTheme.css",
              minify: false,
            },
            {
              key: "fire",
              displayName: "Fire Theme",
              alwaysEnabled: false,
              componentType: "STYLE",
              pathToCSSFile: "./src/styles/fireTheme.css",
              media: "(max-width: 900px)",
              minify: false,
            },
            {
              key: "burger",
              displayName: "Burger King",
              componentType: "LINK",
              remoteHREF: "https://www.edpike365.com/test/burger.css",
              cacheRemoteCSS: false,
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        commonmark: true,
        footnotes: true,
        pedantic: true,
        // blocks: ["h2"], Blocks option value can be provided here as an array.
        excerpt_separator: `<!-- end -->`,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 740,
              showCaptions: [`title`],
            },
          },
          `gatsby-remark-graphviz`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-embed-snippet`,
            options: {
              // Example code links are relative to this dir.
              directory: `${__dirname}/src/code-examples/`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-code-titles`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: "gatsby-remark-smartypants",
            options: {
              dashes: "oldschool",
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-emoji`,
            options: {
              // default emojiConversion --> shortnameToUnicode
              emojiConversion: "shortnameToUnicode",
              // when true, matches ASCII characters (in unicodeToImage and shortnameToImage)
              // e.g. ;) --> 😉
              ascii: true,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-catch-links`,
      options: {
        // Links are relative to this directory
        excludeRegex: /excluded-link/,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `EdPike365 Blog and Portfolio`,
        short_name: `EdPike365`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `fullscreen`,
        icon: `src/images/logo.svg`, // This path is relative to the root of the site.
        theme_color_in_head: false, // This will avoid adding theme-color meta tag.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-build-date`,
      options: {
        locales: "fr-FR",
        options: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
