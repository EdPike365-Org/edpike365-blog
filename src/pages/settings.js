import * as React from "react"
import styled from "@emotion/styled"
import Layout from "../components/Layout"
import { DarkModeToggle, StyleSelector, StyleSummary, PrefersDarkMode } from "../components/SHG_Components"
import Section from "../components/Section"

const FlexDiv = styled.div`
  display: inline-flex;
  align-items: center;
  height: 2.8rem;
`

const Settings = () => {
  return (
    <Layout>
      <h2>Settings</h2>
      <Section title="Style">
        Style Selector: <StyleSelector/>
        <hr/>
        <PrefersDarkMode/>
        <hr/>
        <FlexDiv>Dark Mode Toggle: <DarkModeToggle/></FlexDiv>

        <StyleSummary/>
      </Section>
    </Layout>
  )
}

export default Settings
