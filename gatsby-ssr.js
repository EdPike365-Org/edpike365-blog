import React from "react"
import { SHGStyleContextProvider } from "./src/contexts/SHG_Context"
import { NavContextWrapper } from "./src/contexts/NavContext"
import fs from "fs"
import {
  getSHGConfigFromFile,
  getSHGStyleElements,
  getSHGPageFunction,
} from "./src/styles/SHG_Utils"
//import dotenv from "dotenv"
//dotenv.config( {path: `.env.${process.env.NODE_ENV}`,} )

export const wrapRootElement = props => {
  return (
    <SHGStyleContextProvider>
      <NavContextWrapper {...props} />
    </SHGStyleContextProvider>
  )
}

//https://github.com/gatsbyjs/gatsby/issues/15519

// you can only export this hook once
export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
  getPreBodyComponents,
  replacePreBodyComponents,
}) => {
  const SHGConfig = getSHGConfigFromFile(fs)
  injectSHGStylesIntoHead(SHGConfig, getHeadComponents, replaceHeadComponents)
  injectSHGClientJSIntoTopOfBody(
    SHGConfig,
    getPreBodyComponents,
    replacePreBodyComponents
  )
}

const injectSHGStylesIntoHead = (
  SHGConfig,
  getHeadComponents,
  replaceHeadComponents
) => {
  console.info(
    "gatsby-ssr.js onPreRenderHTML(): SHG loading and injecting styles..."
  )
  const headComps = getHeadComponents()
  const { styleElements } = getSHGStyleElements(SHGConfig, fs)
  const newHeadComps = [].concat(headComps, styleElements)
  replaceHeadComponents(newHeadComps)
  ;("gatsby-ssr.js onPreRenderHTML(): Replaced HeadComponets.")
}

const injectSHGClientJSIntoTopOfBody = (
  SHGConfig,
  getPreBodyComponents,
  replacePreBodyComponents
) => {
  console.info(
    "gatsby-ssr.js onPreRenderHTML(): Getting SHG function from js file, injecting at top of body."
  )
  const bodyComps = getPreBodyComponents()
  const pageFunction = getSHGPageFunction(
    SHGConfig.clientJSFilePath,
    fs,
    SHGConfig.minifyJS
  )
  // make sure its on top
  const newBodyComps = [].concat(pageFunction, bodyComps)
  replacePreBodyComponents(newBodyComps)
  console.info("gatsby-ssr.js onPreRenderHTML(): Replaced PreBodyComponets.")
}
