;(function () {
  console.log("!!!! StyleHeadGames Flash Prevention Code is running")

  // SHGModel is populated before page load. It should match StyleHeadGames.json
  // However, this local SHGModel will be more accurate because it is populated on page load
  // and reflects the styles that ACTUALLY got inserted on SSR.
  class SHGModel {
    //idPrefix doubles as local storage Key
    //TODO: get this from config file
    constructor() {
      this.idPrefix = "StyleHeadGamesID_";
      this.styleElements = [];
      this.darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
      //when adding evt handler, do not put handleX() or handleX(evt)
      //if (),window tries to run the event when its declared. There will be no evt yet.
      //if you use the arrow function, "this" will be the real this, and not the media query list's "this"
      this.darkQuery.addEventListener("change", evt => this.handleDarkQueryChange(evt) );
      this.populateSHGModelFromPage();
      this.setInitialStyle();
    }

    MediaQueryListEvent

    // ---------------- SHGModel initiation --------------------------
    populateSHGModelFromPage = () => {
      console.log("populateSHGModel() running...");

      this.styleElements = document.querySelectorAll(
        "[id*='" + this.idPrefix + "']"
      )

      console.log(
        "populateSHGModelFromPage(): done populating, found " +
          this.styleElements.length +
          " style Elements."
      )
    }

    setInitialStyle = () => {
      console.log("setInitialStyle(): running...")
      let style = this.getStyleForStoredStyleID(this.styleElements)
      if(!style){
        style = this.getStyleForDarkQuery(this.styleElements)
      }
      if (!style) {
        console.log(
          "setInitialStyle(): Could not get style for stored ID or dark mode. Setting to use contais default."
        )
        style = this.getLastStyleWithUse("default", this.styleElements)
      }
      this.setAndSaveStyle(style)
    }

    // --------------- Access and Mutate -------------------------

    getStylesWithUse = function (useVal, styles) {
      let results = []
      styles.forEach(style => {
        if (style.dataset.use.includes(useVal)) {
          results.push(style)
        }
      })
      if (results.length == 0) {
        console.log("Could not find any styles with USE containing " + useVal)
      }
      return results
    }

    getLastStyleWithUse = function (useVal, styles) {
      let results = this.getStylesWithUse(useVal, styles)
      if (results.length > 0) {
        return results[results.length - 1]
      } else {
        return null
      }
    }

    getStylesWithID = (idVal, styles) => {
      let results = []
      styles.forEach(style => {
        if (style.id === idVal) {
          results.push(style)
        }
      })
      if (results.length == 0) {
        console.log("Could not find any styles with ID === " + idVal)
      }
      return results
    }

    getLastStyleWithID = (idVal, styles) => {
      let results = this.getStylesWithID(idVal, styles)
      if (results.length > 0) {
        return results[results.length - 1]
      } else {
        return null
      }
    }

    enableStyle = style => {
      if (style) {
        style.disabled = false
        console.log("Enabled style id = " + style.id)
      }
    }

    disableStyle = style => {
      if (style) {
        style.disabled = true
        console.log("Disabled style id = " + style.id)
      }
    }

    toggleEnabledStyles = (styleToEnable, styles) => {
      styles.forEach(style => {
        if (style.dataset.use.includes("always")) {
          //skip, always enabled
        } else if (style.id === styleToEnable.id) {
          this.enableStyle(style)
        } else {
          this.disableStyle(style)
        }
      })
    }

    getStoredStyleID = () => {
      var styleID = null
      try {
        styleID = localStorage.getItem(this.idPrefix)
        console.log("getStoredStyleID(): found stored styleID " + styleID)
      } catch (err) {
        console.log("getStoredStyleID(): " + err)
      }
      return styleID
    }

    storeStyleID = styleID => {
      try {
        localStorage.setItem(this.idPrefix, styleID)
      } catch (err) {
        console.log("storeStyleID(): " + err)
      }
    }

    // The UI will have a listener mapped here and overwrite this
    // We will use it here to pass in the SHGModel when its state changes
    modelStateChanged = () => {
      //check it out!
    }

    // this should be the ONLY place that commits changes after initiation.
    // If you do it somewhere, rememeber to call modelStateChanged(this)
    setAndSaveStyle = style => {
      // final failsafe
      if (style) {
        this.toggleEnabledStyles(style, this.styleElements)
        this.storeStyleID(style.id)
        this.modelStateChanged(this) //Let the UI components know something changed
      } else {
        console.log("setAndSaveStyle(): Someone tried to set Style to " + style)
      }
    }

    getStyleForDarkQuery = (styleElements) => {
      if (this.darkQuery.matches) {
        return this.getLastStyleWithUse("dark", styleElements)
      } else {
        return this.getLastStyleWithUse("light", styleElements)
      }
    }

    //---------------Style Initialization--------------
    getStyleForStoredStyleID = (styleElements) => {
      const styleID = this.getStoredStyleID()
      return this.getLastStyleWithID(styleID, styleElements)
    }

    // Let components set style by ID or by use
    // We do this late because we do not want the user changing styles while loading (they should not be able to anyway)
    // this function is global, can be called from app code
    setSHGStyleByID = function (styleID) {
      console.log("__setSHGStyleID(): trying to set for :" + styleID)
      const style = this.getLastStyleWithID(styleID, this.styleElements)
      if (style) {
        this.setAndSaveStyle(style)
        return true
      } else {
        return false
      }
    }

    setSHGStyleByUse = function (styleUse) {
      console.log("__setSHGStyleUse(): trying to set for :" + styleUse)
      const style = this.getLastStyleWithUse(styleUse, this.styleElements)
      if (style) {
        this.setAndSaveStyle(style)
        return true
      } else {
        return false
      }
    }

    handleDarkQueryChange(evt) {
      console.log(
        "darkQueryListener: prefers-color-scheme just changed, wants dark = " +
          evt.matches
      )
      let style = this.getStyleForDarkQuery(this.styleElements)
      if (!style) {
        console.log(
          "darkQuery eventListener: Could not get style for use light, setting to default."
        )
        style = this.getLastStyleWithUse("default", this.styleElements)
      }
      this.setAndSaveStyle(style)
    }
  }

  const thisSHGModel = new SHGModel()


  window.__SHGModel = thisSHGModel
})()
