import { css } from "@emotion/react"
/* importing from text files requires that we use "import * as" to prevent compiler error */
import * as normalizeCSS from "./normalize.css"
import * as coreThemeCSS from "./coreTheme.css"

// This is simply an emotion wrapper to the gatsby starter blog's style.css file
// NOTE: I had to replace all the pips in the comments in normalize.css with ""s
// WARNING: If we import a css file into a js file, and use it with css``, THEN use it 
// in the Emotion <Global>, eg we insert it later with a darkmode button, that css code 
// will be added to the global css FILE ahead of time (at SSR build time) and in effect immediately
// so your darkMode button will not work
// ON THE OTHER HAND: if the css code is hardcoded into the Emotion css`` function, it will NOT 
// be added to the global css file.
export const coreTheme = css`
  ${normalizeCSS}
  ${coreThemeCSS}
`

