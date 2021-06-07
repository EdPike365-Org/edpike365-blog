import React from "react"
import { SHGStyleContextProvider } from "./src/contexts/SHG_Context"
import { NavContextWrapper } from "./src/contexts/NavContext"

export const wrapRootElement = props => {
  return (
    <SHGStyleContextProvider>
      <NavContextWrapper {...props} />
    </SHGStyleContextProvider>
  )
}

// This css shows up in the common.css file after build
// Theme for prismjs
require("prismjs/themes/prism-okaidia.css")
// Enable prismjs line numbering
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
