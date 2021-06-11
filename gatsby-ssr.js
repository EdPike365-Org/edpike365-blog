import React from "react"
import { HSBStyleContextProvider } from "./src/headstyleboss/HSB_Context"
import { NavContextWrapper } from "./src/contexts/NavContext"
import fs from "fs"
import {
  getHSBConfigFromFile,
  getHSBStyleElements,
  getHSBPageFunction,
  injectHSBStylesIntoHead,
  injectHSBClientJSIntoTopOfBody
} from "./src/headstyleboss/HSB_Utils"

//import dotenv from "dotenv"
//dotenv.config( {path: `.env.${process.env.NODE_ENV}`,} )

export const wrapRootElement = props => {
  return (
    <HSBStyleContextProvider>
      <NavContextWrapper {...props} />
    </HSBStyleContextProvider>
  )
}

// I have not figured out how to get access to GraphQL down in the function.
//https://github.com/gatsbyjs/gatsby/issues/15519


// Pre load all the file system stuff because
// onPreRenderHTML, etc, runs once per page in prod, so would be big hit
const HSBConfig = getHSBConfigFromFile(fs)
const HSBStyleElements = getHSBStyleElements(HSBConfig, fs)
const HSBPageFunction = getHSBPageFunction( HSBConfig.clientJSFilePath, fs, HSBConfig.minifyJS)

// you can only export this hook once
// in dev it only runs once. in prod, it runs once per page.
export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
  getPreBodyComponents,
  replacePreBodyComponents,
}) => {
  injectHSBStylesIntoHead(HSBStyleElements, getHeadComponents, replaceHeadComponents)
  injectHSBClientJSIntoTopOfBody( HSBPageFunction, getPreBodyComponents, replacePreBodyComponents )
  //console.info("gatsby-ssr.js onPreRenderHTML(): Injected HSB styles and PageFunction into ...")
}

