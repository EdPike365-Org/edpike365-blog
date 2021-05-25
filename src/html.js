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
                window.__onThemeChange = function() {};
                
                console.log("!!!! Flash Prevention Code is running");

                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  setActiveStyle(newTheme);
                  //document.body.className = newTheme;
                  window.__onThemeChange(newTheme);
                }

                function getLastWithUse(useVal, inlinedStyles){
                  let result = null;
                  for(var i=0; i < inlinedStyles.length; i++) {
                    let thisStyle = inlinedStyles[i];
                    if(thisStyle.dataset.use.includes(useVal)){
                      result = thisStyle;
                      continue;
                    }
                  }
                  return result;
                }

                function getLastWithID(idVal, inlinedStyles){
                  let result = null;
                  for(var i=0; i < inlinedStyles.length; i++) {
                    let thisStyle = inlinedStyles[i];
                    if(thisStyle.id === idVal){
                      result = thisStyle;
                      continue;
                    }
                  }
                  return result;
                }

                function toggleStyle(styleToEnable, inlinedStyles){
                  for(var i=0; i < inlinedStyles.length; i++) {
                    let thisStyle = inlinedStyles[i];
                    if (thisStyle.dataset.use == "always"){
                      continue;
                    }else if (thisStyle.id === styleToEnable.id){
                      thisStyle.disabled = false;
                      continue;
                    }else{
                      thisStyle.disabled = true;
                    }
                  }
                }

                function enableLastWithUse(useVal, inlinedStyles){
                  const lastUse = getLastWithUse(useVal, inlinedStyles);
                  if(lastUse != null){
                    toggleStyle(lastUse, inlinedStyles);
                    return true;
                  }else{
                    return false;
                  }
                }

                function setActiveStyle(styleID) {
                  console.log("setActiveStyle(): " + styleID)
                  //get all the inlinedHeadStyles
                  const inlinedStyles = document.querySelectorAll("[id*='HeadInlined']");

                  // "use" case: no styleID
                  if(!styleID || styleID === ""){
                    enableLastWithUse("default", inlinedStyles);
                    return;
                  }

                  // request for "dark" is special "use" case
                  if(styleID === "dark"){
                    if(enableLastWithUse("dark", inlinedStyles)){
                      return;
                    }//otherwise fall through
                  }
                    
                  // try to find one with the styleID, aka themeName
                  const lastWithID = getLastWithID(styleID, inlinedStyles);
                  if(lastWithID != null){
                    toggleStyle(lastWithID, inlinedStyles)
                    return;
                  }

                  //there was a styleID but nothing matched
                  enableLastWithUse("default", inlinedStyles);
                    
                }

                var preferredTheme;
                try {
                  preferredTheme = localStorage.getItem('HeadInlinedStyles_ID');
                } catch (err) { console.log(err); }

                window.__setPreferredTheme = function(newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('HeadInlinedStyles_ID', newTheme);
                  } catch (err) { console.log(err) }
                }

                var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkQuery.addListener(function(e) {
                  console.log("darkQueryListener: about to call __setPreferredTheme, wants dark = " + e.matches)
                  window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                });

                //call setTheme when script first runs
                console.log("first run: about to call setTheme. preferredTheme = " + preferredTheme)
                setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
                
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
