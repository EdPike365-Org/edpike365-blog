import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { withPrefix } from "gatsby"
import { Helmet } from "react-helmet"
import "../styles/normalize2.css"
//import * as normalizeCSS from "../styles/coreTheme.css"

// how to get rid of flash https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app
// how to minify and inline stylesheets https://stackoverflow.com/questions/50768575/is-it-possible-to-have-html-webpack-plugin-generate-style-elements-from-css

/*
      <link href={withPrefix('/styles/normalize2.css')} rel="stylesheet" type="text/css" />
      <link href={withPrefix('/styles/coreTheme.css')} rel="stylesheet" type="text/css" />
      <link href={withPrefix('/styles/darkTheme.css')} rel="stylesheet" type="text/css" />
      <link href={withPrefix('/styles/redTheme.css')} rel="stylesheet" type="text/css" />
      */
// These elements are added at run time in develop mode. They are rendered in at compile/build time in build mode.
const HeaderTags = () => {
  const query = graphql`
    {
      allFile(filter: { extension: { eq: "css" } }) {
        nodes {
          id
          name
          internal {
            content
          }
        }
        totalCount
      }
    }
  `

  const data = useStaticQuery(query)
  const totalCount = data.allFile.totalCount
  const cssFiles = data.allFile.nodes

  console.log("HeaderTags: got " + totalCount + " css files. ")
  return (
    <Helmet>
      <style type="text/css" id="normalize2">{`h3 { color: yellow; }`}</style>

      {/* Duplicate components need unique key to keep react from complaining */}
      {cssFiles.map(cssFile => {
        return (
          <style type="text/css" id={cssFile.name} key={cssFile.id}>
            {cssFile.internal.content}
          </style>
        )
      })}
    </Helmet>
  )
}

export default HeaderTags

/*if you ever want to put a style in the head directly, as in html.js, this formatting works:

<style >{`

:root{
  
--color-primary-light: purple;
--color-primary-main: yellow;
--color-primary-dark: green;
--color-primary-text: #fff;

}
h3 { color: purple; }

`}
</style>
*/
