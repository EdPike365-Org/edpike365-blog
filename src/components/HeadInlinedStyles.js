import * as React from "react"
import { Helmet } from "react-helmet"
import InlinedStyles, {exStyleEls } from "./InlinedStyles"

// how to get rid of flash https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app
// how to minify and inline stylesheets https://stackoverflow.com/questions/50768575/is-it-possible-to-have-html-webpack-plugin-generate-style-elements-from-css

// These Helmet elements are added at run time in develop mode, so they are not in the html code. 
// They are rendered in at compile/build time in build mode, so they are in the html.

const HeadInlinedStyles = () => {
  return (
    <Helmet>
    </Helmet>
  )
}

export default HeadInlinedStyles

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
