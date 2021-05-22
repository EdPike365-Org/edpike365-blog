import { css } from "@emotion/react"
/* importing from text files requires that we use "import * as" to prevent compiler error */
import * as darkThemeCSS from "./darkTheme.css"

// This is simply an emotion wrapper to the gatsby starter blog's style.css file
// NOTE: I had to replace all the pips in the comments with ""s
export const darkTheme = css`
  ${darkThemeCSS}
`