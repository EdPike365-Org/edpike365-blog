/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// TODO You can author gatsby-config and gatsby-node in ESM syntax.
// This feature was added in gatsby@5.3.0.

// NOTES:
// Gatsby CLI location, etc: npm list -g --depth 0
// webpack.config.js is in C:\Users\EdPike365\code\edpike365-blog\node_modules\gatsby\dist\utils
// How to modify gatsby webpack: https://gist.github.com/m-allanson/8fc8943f621a6e5460fb9aa65d2451a9

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `EdPike365`,
    author: {
      name: `Ed Pike`,
      summary: `Full Stack, DevOps, Tech Educator, Science Enthusiast.`,
    },
    description: `Technology blog, portfolio and custom Gatsby demo.`,
    siteUrl: `https://www.edpike365.com/`,
    image: '/logo.svg',
    monetization: '$ilp.uphold.com/yLBeLwUyE2A2',
    social: {
      twitter: process.env.TWITTER,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-head-style-boss`,
      options: {
        minifyBrowserFunction: false,
        iifeDebugLevel: 5,
        generalDebugLevel: 5,
        styleConfigs: [
          {
            key: 'normalize',
            displayName: 'Normalize2 Reset',
            alwaysEnabled: true,
            componentType: 'STYLE',
            crossorigin: 'false',
            pathToCSSFile: './src/styles/normalize2.css',
          },
          {
            key: 'core',
            displayName: 'Core Theme',
            alwaysEnabled: true,
            componentType: 'STYLE',
            crossorigin: 'false',
            pathToCSSFile: './src/styles/coreTheme.css',
            minify: true,
          },
          {
            key: 'light',
            displayName: 'Default, Light Theme',
            alwaysEnabled: false,
            uses: 'default',
            componentType: 'STYLE',
            pathToCSSFile: './src/styles/lightTheme.css',
            minify: false,
          },
          {
            key: 'dark',
            displayName: 'Dark Theme',
            alwaysEnabled: false,
            uses: 'dark',
            componentType: 'STYLE',
            pathToCSSFile: './src/styles/darkTheme.css',
            minify: false,
          },
          {
            key: 'burger',
            displayName: 'Burger King',
            componentType: 'LINK',
            remoteHREF:
              'https://www.edpike365.com/gatsby-head-style-boss-test/burger.css',
            cacheRemoteCSS: false,
          },
          {
            key: 'fire',
            displayName: 'Fire Theme',
            alwaysEnabled: false,
            componentType: 'STYLE',
            pathToCSSFile: './src/styles/fireTheme.css',
            media: '(max-width: 1280px)',
            minify: false,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/site`,
        name: `site-content-files`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog-content-files`,
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
        footnotes: true,
        // uses gray-matter for front matter, so you can use options from there as well
        // at https://github.com/jonschlinkert/gray-matter#options
        excerpt_separator: `<!-- excerpt-end -->`,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 740,
              showCaptions: [`title`],
            },
          },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: 'Table of Contents',
              tight: true,
              ordered: false,
              fromHeading: 2,
              toHeading: 4,
              className: 'table-of-contents',
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              elements: [`h1`, `h2`, `h3`],
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
              directory: `${__dirname}/content/blog/gatsby/code-examples/`,
            },
          },
          `gatsby-remark-code-titles`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
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
              emojiConversion: 'shortnameToUnicode',
              // when true, matches ASCII characters (in unicodeToImage and shortnameToImage)
              // e.g. ;) --> 😉
              ascii: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    {
      resolve: `gatsby-plugin-catch-links`,
      options: {
        // Links are relative to this directory
        excludeRegex: /excluded-link/,
      },
    },
    /*
    {
       resolve: `gatsby-plugin-google-analytics`,
       options: {
         trackingId: `ADD YOUR TRACKING ID HERE`,
       },
     },    
    */
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { frontmatter: {date: DESC}},
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
            title: 'EdPike365 RSS Feed',
            output: '/rss.xml',
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
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/logo-icon.svg`, // This path is relative to the src root of the site.
        icons: [
          {
            src: 'icons/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
        theme_color_in_head: true, // This will avoid adding theme-color meta tag.
      },
    },
    {
      resolve: `gatsby-source-build-date`,
      options: {
        locales: 'fr-FR',
        options: {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        },
      },
    },
  ],
}
