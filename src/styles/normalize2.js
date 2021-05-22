import { css } from "@emotion/react"
/* importing from text files requires that we use "import * as" to prevent compiler error */
import * as normalize2CSS from "./normalize2.css"

// This is simply an emotion wrapper to the gatsby starter blog's style.css file
// NOTE: I had to replace all the pips in the comments with ""s
export const normalize2Theme = css`
  ${normalize2CSS}
`