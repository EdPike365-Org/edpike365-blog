import React from "react"
import { NavContextProvider } from "./src/contexts/NavContext"

export const wrapRootElement = ({ element }) => {
  return (
    <NavContextProvider >{element}</NavContextProvider>
  )
}

// This css shows up in the common.css file after build
// TODO: only make show up on blog pages
// Theme for prismjs
require("prismjs/themes/prism-okaidia.css")
// Enable prismjs line numbering
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
