import React from 'react'
import * as styles from './StyleSettings.module.css'
import DarkModeToggle from 'gatsby-head-style-boss/components/DarkModeToggle'
import StyleSheetSelector from 'gatsby-head-style-boss/components/StyleSheetSelector'
import TotalNumStyleSheets from 'gatsby-head-style-boss/components/TotalNumStyleSheets'
import StyleSheetSummaryCards from 'gatsby-head-style-boss/components/StyleSheetSummaryCards'
import PrefersDarkMode from 'gatsby-head-style-boss/components/PrefersDarkMode'

const StyleSettings = () => {
  return (
    <div className={`${styles.styleSettingsDiv} style-settings-div`}>
      <p>
        These style widgets are part of the{' '}
        <a href="https://www.gatsbyjs.com/plugins/gatsby-head-style-boss/">
          gatsby-head-style-boss
        </a>{' '}
        library that I wrote.
      </p>
      <p>
        NOTE!!!! Fire Theme is has a max-width setting as a demostration. If you don't see a change,
        change to a lower browser width. (ctrl + mouse scroll)
      </p>
      <p>
        NOTE 2!!! As of 2024, if you are using Chrome on Windows, it will automatically apply dark
        mode to the styles on this site. Unlike the Dark Reader plugin, there is no simple interface
        to turn it off per site. <br />
        You can disable it thusly:
        <ul>
          <li>In Chrome's address bar, paste chrome://flags/#enable-force-dark and press Enter</li>
          <li>In "Auto Dark Mode for Web Contents," change the selection to "Disabled"</li>
          <li>Click the "Relaunch" button to restart the browser</li>
        </ul>
      </p>
      <h4>Style Sheet Widgets:</h4>
      Dark Mode Toggle: <DarkModeToggle />
      <br />
      Style Selector: <StyleSheetSelector />
      <hr />
      User set <strong>OS</strong> to Prefer Dark Mode:{' '}
      <strong>
        <PrefersDarkMode />
      </strong>
      <hr />
      Number of Style Sheets Managed:{' '}
      <strong>
        <TotalNumStyleSheets />
      </strong>
      <br />
      <br />
      <h4>Style Sheets In Cascading Order:</h4>
      <StyleSheetSummaryCards />
    </div>
  )
}

export default StyleSettings
