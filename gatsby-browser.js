import React from "react"
import { HSBStyleContextProvider } from "./src/headstyleboss/HSB_Context"
import { NavContextWrapper } from "./src/contexts/NavContext"

export const wrapRootElement = props => {
  return (
    <HSBStyleContextProvider>
      <NavContextWrapper {...props} />
    </HSBStyleContextProvider>
  )
}

// This css shows up in the common.css file after build
// Theme for prismjs
require("prismjs/themes/prism-okaidia.css")
// Enable prismjs line numbering
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
