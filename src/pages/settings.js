import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/SEO"
import { ThemeContextListener, DarkModeToggle, ThemeSelector } from "../components/ThemeSetters"
import {PreferredThemeListener} from "../components/ThemePrefDetector"

const Settings = ({location}) => {
  
 return (
    <Layout location={location}>
      <Seo title="Site Settings" />
      <h2>Settings</h2>
      <h4>Color Theme</h4>
      <p>Theme Selector: <ThemeSelector/></p>
      <p>Dark Mode Toggle: <DarkModeToggle/></p>
      <PreferredThemeListener showText />
      <ThemeContextListener showText />
    </Layout>
  )
}

export default Settings