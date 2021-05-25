import * as React from "react"
import fs from "fs"
//import dotenv from "dotenv"
//dotenv.config( {path: `.env.${process.env.NODE_ENV}`,} )

//https://github.com/gatsbyjs/gatsby/issues/15519

console.info("gatsby-ssr.js: running")

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {

  console.info("gatsby-ssr.js onPreRenderHTML(): running")

  let rawData
  try{
    rawData = fs.readFileSync("./src/styles/InlineHeadLinks.json")
    fs.close
  }catch(err){
    console.error("gatsby-ssr.js onPreRenderHTML(): " + err)
    fs.close      
    process.exit();
  }

  const styleConfig = JSON.parse(rawData)
  const stylesDefs = styleConfig.headInlinedStyleTags.inlinedStyles

  const inlinedStyles = []
  stylesDefs.forEach(styleDef => {

    let thisKey = Math.floor(Math.random() * 1000000)
    let cssString = ""

    let fileName = styleConfig.folder + styleDef.fileName + ".css"
    console.log(fileName)
    try {
      cssString = fs.readFileSync(fileName, "utf-8")
      fs.close
    } catch (err) {
        console.error(
            "Could not find css file " + fileName +
              ". Check InlineHeadLinks.json.")
        console.error(err)
      fs.close
    }

    const thisStyle = {
      displayName: styleDef.displayName,
      use: styleDef.use,
      id: "HeadInlinedStyles_" + styleDef.fileName,
      key: thisKey,
      title: styleDef.title,
      type: "text/css",
      content: cssString,
    }
    inlinedStyles.push(thisStyle)
  })

  const styleElements = inlinedStyles.map(styleInfo => {
    return (
      <style
        data-displayname={styleInfo.displayName}
        data-use={styleInfo.use}
        id={styleInfo.id}
        key={styleInfo.key}
        title={styleInfo.title}
        type={styleInfo.type}
      >
        {styleInfo.content}
      </style>
    )
  })

  const headComps = getHeadComponents()
  const newHeadComps = [].concat(headComps, styleElements)
  replaceHeadComponents(newHeadComps)
}

