import * as React from "react"
import Layout from "../components/Layout"
import { DarkModeToggle, StyleSelector, StyleSummary } from "../components/ThemeSetters"

const Settings = () => {
  return (
    <Layout>
      <h3>Settings</h3>
        Dark Mode Toggle: <DarkModeToggle/>
        <hr/>
        <StyleSelector/>
        <hr/>
        <StyleSummary/>
      
    </Layout>
  )
}

export default Settings
