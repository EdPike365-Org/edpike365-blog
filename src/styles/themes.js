import { coreTheme } from "./coreTheme.js"
import { darkTheme } from "./darkTheme.js"

//TODO consolidate all the theme.js here

// prebuild style arrays to use with emotion <Global>
const lightCssStyles = [coreTheme]

// dark is just a mod to the light theme, so requires it to be there
const darkCssStyles = [...lightCssStyles]
darkCssStyles.push(darkTheme)

//https://www.pluralsight.com/guides/how-to-get-selected-value-from-a-mapped-select-input-in-react
// themeOptions are selector friendly
export const themeOptions = []

// same as "value" in a selector
export const defaultThemeObject = {
    label: "Light",
    value: "lightTheme",
    themeObject: lightCssStyles,
}
themeOptions.push(defaultThemeObject)

const darkThemeObject = {
    label: "Dark",
    value: "darkTheme",
    themeObject: darkCssStyles,
}
themeOptions.push(darkThemeObject)


export const getThemeObject = (themeName) => {
  // Grab the theme css object from the master list of theme options
  console.log(
    "getThemeObject(): searching for themeObject matching themeName: " +
      themeName
  )
  const selectedThemes = themeOptions.filter(obj => {
    return obj.value === themeName
  })
  // This should only be one option. We only use the first one
  const selectedTheme = selectedThemes[0]

  if (selectedTheme) {
    console.log("getThemeObject(): found matching theme.")
    return selectedTheme
  } else {
    console.log("getThemeObject(): NO MATCHING THEME FOUND!!! returning null.")
    return null
  }
}
