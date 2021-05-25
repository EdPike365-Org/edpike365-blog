import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

// how to get rid of flash https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app
// how to minify and inline stylesheets https://stackoverflow.com/questions/50768575/is-it-possible-to-have-html-webpack-plugin-generate-style-elements-from-css

// These Helmet elements are added at run time in develop mode, so they are not in the html code.
// They are rendered in at compile/build time in build mode, so they are in the html.

const getFileForStyle = (style, cssFiles) => {
  // you cannot use forEach or it will always return null
  for (var i = 0; i < cssFiles.length; i++) {
    let cssFile = cssFiles[i]
    if (cssFile.name === style.fileName) {
      //add a title and use fields
      cssFile.title = style.title
      cssFile.displayName = style.displayName
      cssFile.use = style.use
      return cssFile
    }
  }
  console.error(
    "HeadInlinedStyles: Could not find css file for style.fileName " +
      style.fileName +
      ". Check css files for incorrect name."
  )
  return null
}

const getFilesToInline = (stylesToInline, cssFiles) => {
  const results = []
  stylesToInline.forEach(style => {
    const thisFile = getFileForStyle(style, cssFiles)
    if (thisFile != null) results.push(thisFile)
  })
  return results
}


/*
const createStyleElementList = () => {
   
    const cssFiles = data.allFile.nodes

    const inlinedStyles =
      data.site.siteMetadata.headInlinedStyleTags.inlinedStyles
  
    const filesToInline = getFilesToInline(inlinedStyles, cssFiles)
    const styleEls = filesToInline.map(cssFile => {
      return (
        <style 
          data-displayname={cssFile.displayName} 
          data-use={cssFile.use}
          id={"HeadInlinedStyles_" + cssFile.name} 
          key={cssFile.id} 
          title={cssFile.title}
          type="text/css" 
        >
          {cssFile.internal.content}
        </style>
      )
    });
    return styleEls
}
*/
//export const exStyleEls;
const InlinedStyles = () => {

    //const data = useStaticQuery(query)
    //console.log("InlinedStyles: got " + data.allFile.totalCount + " css files. ")

    //const styleEls = createStyleElementList(data)
    ///exStyleEls = styleEls
  //return( < React.Fragment >{inlinedStyles}</React.Fragment> )
  return (<>hello</>)
  
}

export default InlinedStyles



//import * as normalizeCSS from "../styles/coreTheme.css"
/*
      <link href={withPrefix('/styles/normalize2.css')} rel="stylesheet" type="text/css" />
      <link href={withPrefix('/styles/coreTheme.css')} rel="stylesheet" type="text/css" />
      <link href={withPrefix('/styles/darkTheme.css')} rel="stylesheet" type="text/css" />
      <link href={withPrefix('/styles/redTheme.css')} rel="stylesheet" type="text/css" />
      */

// this is a really good thread about inlining css in the header, trying to modify webpack
// i think this is the default webpack minifier https://survivejs.com/webpack/styling/separating-css/
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
