import * as React from "react"

export const getSHGStyleElements = (fs) => {

    let rawData = null
    try{
      rawData = fs.readFileSync("./src/styles/StyleHeadGames.json")
      fs.close
    }catch(err){
      console.error("gatsby-ssr.js onPreRenderHTML(): " + err)
      fs.close      
      process.exit();
    }
  
    const SHGConfig = JSON.parse(rawData)
    const styles = SHGConfig.styleElements.styles
  
    const loadedStyles = []
    styles.forEach(styleDef => {
  
      // having to use [] because field names have dashes for consistency with element attribute names
      const fileName = SHGConfig.folder + styleDef["data-filename"]
      console.log("Loading css file: " + fileName)
  
      let cssString = ""
      try {
        cssString = fs.readFileSync(fileName, "utf-8")
        fs.close
      } catch (err) {
          console.error(
              "Could not find css file " + fileName +
                ". Check json config file.")
          console.error(err)
        fs.close
      }
  
      styleDef.content = cssString
      // data-key is for React
      //styleDef["key"] = makeReactKey()
  
      loadedStyles.push(styleDef)
    })
  
    const styleElements = loadedStyles.map(styleInfo => {
      return (
        <style
          data-filename={styleInfo["data-filename"]}
          data-displayname={styleInfo["data-displayname"]}
          data-use={styleInfo["data-use"]}
          key={makeReactKey()}
          id={styleInfo.id}
          title={styleInfo.title}
          type={styleInfo.type}
        >
          {styleInfo.content}
        </style>
      )
    })
  
    return styleElements;
}

const makeReactKey = () => {
  return Math.floor(Math.random() * 1000000)
}

export const getSHGPageFunction = (fs) => {
    let jsString = null
    try{
        const fileName = "./src/styles/StyleHeadGames_browser.js"
        jsString = fs.readFileSync(fileName, "utf-8")
        fs.close
      }catch(err){
        console.error("gatsby-ssr.js getSHGPageFunction(): " + err)
        fs.close      
        process.exit();
      }

    function createMarkup(){
        return {__html: jsString}
    }

    //need to key to suppress React warning
    return(
        <script key={makeReactKey} dangerouslySetInnerHTML={ createMarkup() } />
    )

}
