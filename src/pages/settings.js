import * as React from "react"
import Layout from "../components/Layout"
import { DarkModeToggle, StyleSelector, StyleSummary, PrefersDarkMode } from "../components/StyleHeadGames"
import Content from "../components/Content"

const Settings = () => {
  return (
    <Layout>
      <h2>Settings</h2>
      <Content title="Style">
        <PrefersDarkMode/><br/>
        Dark Mode Toggle: <DarkModeToggle/><br/>
        Style Selector: <StyleSelector/>
        <StyleSummary/>
      </Content>
    </Layout>
  )
}

export default Settings
