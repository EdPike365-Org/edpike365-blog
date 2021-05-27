import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
  
              //UI can register to listen to this
              window.__onSHGStyleChange = function() {};
            
              console.log("!!!! StyleHeadGames Flash Prevention Code is running");
            
              // SHGModel is populated before page load. It should match StyleHeadGames.json
              // However, SHGModel will be more accurate because it is populated on page load
              // and reflects the styles that ACTUALLY got inserted on SSR.
              const SHGModel = {
                //idPrefix doubles as local storage Key
                idPrefix: "StyleHeadGamesID_",
                styleElements: []
              }
            
              function populateSHGModelFromPage() {
                console.log("populateSHGModel() running...")
                
                SHGModel.styleElements = document.querySelectorAll(
                  "[id*='" + SHGModel.idPrefix + "']"
                );
            
                console.log("populateSHGModelFromPage(): done populating, found " + SHGModel.styleElements.length + " style Elements.")
              }
            
              populateSHGModelFromPage();
            
              function getStylesWithUse(useVal, styles) {
                let results = [];
                styles.forEach(style => {
                  if (style.dataset.use.includes(useVal)) {
                    results.push(style);
                  }
                })
                if (results.length == 0) {
                  console.log("Could not find any styles with USE containing " + useVal);
                }
                return results;
              }
            
              function getLastStyleWithUse(useVal, styles) {
                let results = getStylesWithUse(useVal, styles);
                if (results.length > 0) {
                  return results[results.length - 1];
                } else {
                  return null;
                }
              }
            
              function getStylesWithID(idVal, styles) {
                let results = [];
                styles.forEach(style => {
                  if (style.id === idVal) {
                    results.push(style);
                  }
                })
                if (results.length == 0) {
                  console.log("Could not find any styles with ID containing " + idVal);
                }
                return results;
              }
            
              function getLastStyleWithID(idVal, styles) {
                let results = getStylesWithID(idVal, styles);
                if (results.length > 0) {
                  return results[results.length - 1];
                } else {
                  return null;
                }
              }
            
              function enableStyle(style) {
                if (style) {
                    style.disabled = false;
                    console.log("Enabled style id = " + style.id);
                }
              }
            
              function disableStyle(style) {
                if (style) {
                    style.disabled = true;
                    console.log("Disabled style id = " + style.id);
                }
              }
            
              function toggleEnabledStyles(styleToEnable, styles) {
                styles.forEach(style => {
                  if (style.dataset.use.includes("always")) {
                    //skip, always enabled
                  } else if (style.id === styleToEnable.id) {
                    enableStyle(style);
                  } else {
                    disableStyle(style);
                  }
                })
              }
            
              function getStoredStyleID(){
                var styleID = null;
                try {
                  styleID = localStorage.getItem(SHGModel.idPrefix);
                  console.log("getStoredStyleID(): found stored styleID " + styleID);
                } catch (err) {
                  console.log("getStoredStyleID(): " + err);
                }
                return styleID;
              }
            
              function storeStyleID(styleID){
                try {
                  localStorage.setItem(SHGModel.idPrefix, styleID)
                } catch (err) {
                  console.log("storeStyleID(): " + err)
                }
              }
            
              function setAndSaveStyle(style){
                // final failsafe
                if(style){
                  toggleEnabledStyles(style, SHGModel.styleElements);
                  storeStyleID(style.id);
                  window.__onSHGStyleChange(true); //Let the UI know
                }else{
                  console.log("setAndSaveStyle(): Someone tried to set Style to " + style);
                }
              }
            
              const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
            
              function getStyleForDarkQuery(){
                if(darkQuery.matches){
                  return getLastStyleWithUse("dark", SHGModel.styleElements);
                }else{
                  return getLastStyleWithUse("light", SHGModel.styleElements);
                } 
              }
            
              //---------------Initialization--------------
              function getStyleForStoredStyleID(){
                const styleID = getStoredStyleID();
                return style = getLastStyleWithID(styleID, SHGModel.styleElements);
              }
            
              function setInitialStyle(){
                console.log("setInitialStyle(): running...");
                let style = getStyleForStoredStyleID(SHGModel.styleElements);
                if(!style){
                  console.log("setInitialStyle(): could not get style for stored styleID, so trying dark mode");
                  style = getStyleForDarkQuery(SHGModel.styleElements);
                }
                if(!style){
                  console.log("setInitialStyle(): Could not get style for store ID or dark mode. Setting to default.");
                  style = getLastStyleWithUse("default", SHGModel.styleElements);
                }
                setAndSaveStyle(style);
              }
            
              setInitialStyle();
            
              //set ui listener here: we do not want the user changing styles while loading (they should not be able to anyway)
              // this function is global, can be called from app code
              window.__setSHGStyleID = function (styleID) {
                console.log("__setSHGStyleID(): trying to set for :" + styleID)
                let style = getLastStyleWithID(styleID, SHGModel.styleElements);
                if(style){
                  setAndSaveStyle(style);
                  return true;
                }else{
                  return false;
                }
              }
            
              //set event listeners here: we dont want an event listener interfering with setInitialStyle
              darkQuery.addEventListener("change", function (e) {
                console.log(
                  "darkQueryListener: prefers-color-scheme just changed, wants dark = " +
                    e.matches
                );
                let style = getStyleForDarkQuery(SHGModel.styleElements);
                if(!style){
                  console.log("darkQuery eventListener: Could not get style for use light, setting to default.");
                  style = getLastStyleWithUse("default", SHGModel.styleElements);
                }
                setAndSaveStyle(style);
              })
            
            })();
                        `,
          }}
        />

        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
