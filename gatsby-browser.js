import React from 'react'
import { NavContextProvider } from './src/contexts/NavContext'

// - wrapPageElement passes in "props"(props for the current page element)
// and "element" (the current page element).
// - wrapRootElement only passes in arg "element", and it is the gatsby Root element
export const wrapRootElement = ({ element }) => {
  return <NavContextProvider>{element}</NavContextProvider>
}

// This css shows up in the common.css file after build
// TODO: only make show up on blog pages, move to blog.js on wrapPageElement?
// Theme for prismjs
require('prismjs/themes/prism-okaidia.css')
// Enable prismjs line numbering
require('prismjs/plugins/line-numbers/prism-line-numbers.css')
