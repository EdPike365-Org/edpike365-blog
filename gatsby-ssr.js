import React from "react"
import { NavContextProvider } from "./src/contexts/NavContext"

// - wrapPageElement passes in "props"(props for the current page element)
// and "element" (the current page element).
// - wrapRootElement only passes in arg "element", and it is the gatsby Root element
export const wrapRootElement = ({ element }) => {
  return <NavContextProvider>{element}</NavContextProvider>
}

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en-US' });
};
