import React from "react"
import styled from "@emotion/styled"
import DarkModeToggle from "gatsby-head-style-boss/components/DarkModeToggle"
import StyleSelector from "gatsby-head-style-boss/components/StyleSelector"
import StylesSummary from "gatsby-head-style-boss/components/StylesSummary"
import PrefersDarkMode from "gatsby-head-style-boss/components/PrefersDarkMode"

const DarkModeToggleIconDiv = styled.div`
  display: inline-flex;
  align-items: center;
  height: 2.8rem;
  & > .dark-mode-toggle {
    background-color: var(--color-background-paper);
    transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
  }
`

const StyleSettings = () => {

    return (
        <div>
            <p>These style widgets are part of the <a href="https://www.gatsbyjs.com/plugins/gatsby-head-style-boss/">gatsby-head-style-boss</a> library that I wrote.</p>
            <p>NOTE!!!! Fire Theme is has a max-width setting as a demostration. If you
            don't see a change, change to a lower browser width. (ctrl + mouse
            scroll)</p>
            <DarkModeToggleIconDiv>Dark Mode Toggle: <DarkModeToggle /></DarkModeToggleIconDiv>
            <br />
            Style Selector: <StyleSelector />
            <hr />
            <PrefersDarkMode />
            <hr />
            <StylesSummary />
        </div>
    )
}

export default StyleSettings