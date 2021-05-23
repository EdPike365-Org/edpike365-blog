import * as React from "react"
import { withPrefix } from "gatsby"
import { Helmet } from "react-helmet"
import normalize2 from "../styles/normalize2.css"

// how to get rid of flash https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app
// how to minify and inline stylesheets https://stackoverflow.com/questions/50768575/is-it-possible-to-have-html-webpack-plugin-generate-style-elements-from-css

      /*
      <link href={withPrefix('/styles/normalize2.css')} rel="stylesheet" type="text/css" />
      <link href={withPrefix('/styles/coreTheme.css')} rel="stylesheet" type="text/css" />
      <link href={withPrefix('/styles/darkTheme.css')} rel="stylesheet" type="text/css" />
      <link href={withPrefix('/styles/redTheme.css')} rel="stylesheet" type="text/css" />
      */
console.log("hello world" + normalize2);
const HeaderTags = () => {

  return (
    <Helmet>

      <style id="normalize2" >hello</style>
    </Helmet>
  )
}

export default HeaderTags
