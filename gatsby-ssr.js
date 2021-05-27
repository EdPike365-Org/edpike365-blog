import fs from "fs"
import { getSHGStyleElements, getSHGPageFunction } from "./src/styles/StyleHeadGames_Utils"
//import dotenv from "dotenv"
//dotenv.config( {path: `.env.${process.env.NODE_ENV}`,} )

//https://github.com/gatsbyjs/gatsby/issues/15519

// you can only export this hook once
export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
  getPreBodyComponents,
  replacePreBodyComponents,
}) => {

  console.info("gatsby-ssr.js onPreRenderHTML(): SHG loading and injecting styles.")
  const headComps = getHeadComponents()
  const styleElements = getSHGStyleElements(fs)
  const newHeadComps = [].concat(headComps, styleElements)
  replaceHeadComponents(newHeadComps)

  console.info("gatsby-ssr.js onPreRenderHTML(): Getting SHG function from js file.")
  const bodyComps = getPreBodyComponents()
  const pageFunction = getSHGPageFunction(fs)
  const newBodyComps = [].concat(pageFunction, bodyComps)
  replacePreBodyComponents(newBodyComps)

}
