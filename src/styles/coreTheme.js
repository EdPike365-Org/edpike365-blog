import { css } from "@emotion/react"
/* importing from text files requires that we use "import * as" to prevent compiler error */
import * as normalizeCSS from "./normalize.css"
import * as coreThemeCSS from "./coreTheme.css"

// This is simply an emotion wrapper to the gatsby starter blog's style.css file
// NOTE: I had to replace all the pips in the comments with ""s
export const coreTheme = css`
  ${normalizeCSS}
  ${coreThemeCSS}
`

