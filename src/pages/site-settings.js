import * as React from 'react'
import Layout from '../components/layout/Layout'
import Section from '../components/layout/main/Section'
import StyleSettings from '../components/common/StyleSettings'
import BuildInfo from '../components/common/BuildInfo'

const SiteSettings = () => {
  return (
    <Layout>
      <h2>Site Settings</h2>
      <Section title="Style Settings">
        <StyleSettings />
      </Section>
      <br />
      <Section title="Build Info">
        <BuildInfo />
      </Section>
      <br />
    </Layout>
  )
}

export default SiteSettings
