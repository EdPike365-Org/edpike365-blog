import * as React from "react"
import styled from "@emotion/styled"
import Layout from "../components/Layout"
import { DarkModeToggle, StyleSelector, StyleSummary, PrefersDarkMode } from "../components/SHG_Components"
import Content from "../components/Content"

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
`

const Settings = () => {
  return (
    <Layout>
      <h2>Settings</h2>
      <Content title="Style">
        <PrefersDarkMode/>
        <hr/>
        <FlexDiv>Dark Mode Toggle: <DarkModeToggle/></FlexDiv>
        <hr/>
        Style Selector: <StyleSelector/>
        <StyleSummary/>
      </Content>
    </Layout>
  )
}

export default Settings
