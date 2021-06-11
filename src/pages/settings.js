import * as React from "react"
import styled from "@emotion/styled"
import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"
import { DarkModeToggle, StyleSelector, StylesSummary, PrefersDarkMode } from "../headstyleboss/HSB_Components"
import Section from "../components/Section"

const FlexDiv = styled.div`
  display: inline-flex;
  align-items: center;
  height: 2.8rem;
`

const Settings = () => {
  return (
    <Layout>
      <Seo title="Settings" />
      <h2>Settings</h2>
      I put the link to this page up high in the nav to make it more likely that you'll come here to see my stuff.
      <Section title="Style">
        <hr/>
        Style Selector: <StyleSelector/>
        <hr/>
        <PrefersDarkMode/>
        <hr/>
        <FlexDiv>Dark Mode Toggle: <DarkModeToggle/></FlexDiv>

        <StylesSummary/>
      </Section>
    </Layout>
  )
}

export default Settings
