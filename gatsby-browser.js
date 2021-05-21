// custom typefaces
//import "typeface-montserrat"
//import "typeface-merriweather"
import { ThemeWrapper } from "./src/contexts/ThemeContext"

export const wrapRootElement = ThemeWrapper

// This css shows up in the common.css file after build
// Theme for prismjs
require("prismjs/themes/prism-okaidia.css")
// Enable prismjs line numbering
require("prismjs/plugins/line-numbers/prism-line-numbers.css")


