;(function () {
  console.log("StyleHeadGames Flash Prevention Code is running in the body.");
  log = null; 
  // SHGModel is populated before page load. It should roughly match StyleHeadGames.json
  // However, this local SHGModel will be more accurate because it is populated on page load
  // and reflects the style elements that ACTUALLY got inserted on SSR, and their actual state.
  // One of my references https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app  
  class SHGModel {

    constructor() {
      if(log)console.log("SHGModel constructor() running...");
      // idPrefix doubles as local storage Key
      // TODO: get idPrefix from config file, probably via a meta tag, allow any REGEX
      this.idPrefix = "StyleHeadGamesID_";
      this.styles = [];
      
      this.darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
      // If you use the arrow function, "this" will be the real this, and not the media query list's "this"
      this.darkQuery.addEventListener("change", evt => this.handleDarkQueryChange(evt) );

      this.populateSHGModelFromPage();
      this.enableInitialStyle();
      if(log)console.log("SHGModel constructor() done!");
    }

    //------------------------- Public Facing Methods ----------------

    isUsingADarkStyle(){
      let darkStyles = this.getStylesWithUse("dark");
      darkStyles = darkStyles.filter( style => style.disabled == false );
      return(darkStyles.length > 0);
    }

    toggleDarkStyle(){
      if(this.isUsingADarkStyle()){
        const style = this.getLightOrDefaultOrAnyOptionalStyle();
        if(style) this.setSHGStyleByID(style.id);
      }else{
        this.setSHGStyleByUse("dark")
      }
    }

    getOptionalStyles(){
      const styleArray = Array.from(this.styles )
      return styleArray.filter( style => !style.dataset.use.includes("always") );
    }

    getLastEnabledOptionalStyle(){
      let optStyles = this.getOptionalStyles()
      optStyles = optStyles.filter( style => style.disabled == false );
      return optStyles.slice(-1)[0];
    }

    setSHGStyleByID = function (styleID) {
      if(log)console.log("setSHGStyleID(): trying to set for :" + styleID)
      const style = this.getLastStyleWithID(styleID)
      if (style) {
        this.setAndSaveStyle(style)
        return true
      } else {
        return false
      }
    }

    setSHGStyleByUse = function (styleUse) {
      const style = this.getLastStyleWithUse(styleUse)
      if (style) {
        this.setAndSaveStyle(style)
        return true
      } else {
        return false
      }
    }

    // The UI will have a listener mapped here, probs in Context code.
    // They will pull the model every time it changes
    modelStateChanged = () => {
      //check it out!
    }
            
    //---------------------- Begin Private Facing -------------------------------

    // ---------------- SHGModel initiation --------------------------
    populateSHGModelFromPage = () => {

      //TODO: this could ALSO contain links to remote style sheets, but that would jeapardize fast site loads
      this.styles = document.querySelectorAll(
        "[id*='" + this.idPrefix + "']"
      )

      if(log)console.log(
        "populateSHGModelFromPage(): done populating, found " +
        this.styles.length +
          " style Elements."
      )
    }

    enableInitialStyle = () => {
      let style = this.getStyleForStoredStyleID()
      if(!style){
        style = this.getStyleForDarkQueryState()
      }
      if (!style) {
        if(log)console.log(
          "setInitialStyle(): Could not get style for stored ID or dark mode. Setting to use contais default."
        )
        style = this.getLastStyleWithUse("default")
      }
      this.setAndSaveStyle(style)
    }

    handleDarkQueryChange(evt) {
      if(log)console.log(
        "darkQueryListener: prefers-color-scheme just changed, wants dark = " +
          evt.matches
      )
      let style = this.getStyleForDarkQueryState()
      if (!style) {
        if(log)console.log(
          "darkQuery eventListener: Could not get style for use light, setting to default."
        )
        style = this.getLastStyleWithUse("default")
      }
      this.setAndSaveStyle(style)
    }

    //-----------------End Initiation Methods ----------------------------
    
    // --------------- Private Access and Mutate -------------------------
    // this should be the ONLY place that commits changes after initiation.
    // If you do it somewhere else, rememeber to call modelStateChanged(this)
    setAndSaveStyle = (style) => {
      // final failsafe
      if (style) {
        this.toggleEnabledStyles(style)
        this.setStoredStyleID(style.id)
        this.modelStateChanged(this) //Let the UI components know something changed
      } else {
        console.log("ERROR: SHGModel.setAndSaveStyle(): Someone tried to set Style to " + style)
      }
    }

    getStyleForDarkQueryState = () => {
      if (this.darkQuery.matches) {
        return this.getLastStyleWithUse("dark")
      } else {
        return this.getLightOrDefaultOrAnyOptionalStyle()
      }
    }

    toggleEnabledStyles = (styleToEnable) => {
      this.styles.forEach(style => {
        if (style.dataset.use.includes("always")) {
          //skip, always enabled
        } else if (style.id === styleToEnable.id) {
          this.enableStyle(style)
        } else {
          this.disableStyle(style)
        }
      })
    }

    getLightOrDefaultOrAnyOptionalStyle(){
      let style = this.getLastStyleWithUse("light");
      if(!style) style = this.getLastStyleWithUse("default");
      if(!style) style = this.getOptionalStyles().slice(-1)[0];
      if(!style){
        if(log)console.log("WARNING: SHGModel getLightOrDefaultOrAnyOptionalStyle(): could not find any optional styles.");
      } 
      return style;  
    }

    enableStyle = style => {
      if (style) {
        style.disabled = false
        if(log)console.log("Enabled style id = " + style.id)
      }
    }

    disableStyle = style => {
      if (style) {
        style.disabled = true
        if(log)console.log("Disabled style id = " + style.id)
      }
    }

    getLastStyleWithUse = function (useVal) {
      let results = this.getStylesWithUse(useVal)
      if (results.length > 0) {
        return results[results.length - 1]
      } else {
        return null
      }
    }

    getStylesWithUse = function (useVal) {
      let results = []
      this.styles.forEach(style => {
        if (style.dataset.use.includes(useVal)) {
          results.push(style)
        }
      })
      if (results.length == 0) {
        if(log)console.log("WARNING: SHGModel Could not find any styles with USE containing " + useVal)
      }
      return results
    }

    getLastStyleWithID = (idVal) => {
      let results = this.getStylesWithID(idVal)
      if (results.length > 0) {
        return results[results.length - 1]
      } else {
        return null
      }
    }

    getStylesWithID = (idVal) => {
      let results = []
      this.styles.forEach(style => {
        if (style.id === idVal) {
          results.push(style)
        }
      })
      if (results.length == 0) {
        if(log)console.log("WARNING: SHGModel Could not find any styles with ID === " + idVal)
      }
      return results
    }

    getStyleForStoredStyleID = () => {
      const styleID = this.getStoredStyleID()
      return this.getLastStyleWithID(styleID)
    }

    getStoredStyleID = () => {
      var styleID = null
      try {
        styleID = localStorage.getItem(this.idPrefix)
        if(log)console.log("getStoredStyleID(): found stored styleID " + styleID)
      } catch (err) {
        console.log("ERROR: SHGModel getStoredStyleID(): " + err)
      }
      return styleID
    }

    setStoredStyleID = (styleID) => {
      try {
        localStorage.setItem(this.idPrefix, styleID)
      } catch (err) {
        console.log("ERROR: SHGModel setStoredStyleID(): " + err)
      }
    }
  }

  const thisSHGModel = new SHGModel()
  window.__SHGModel = thisSHGModel
})()
