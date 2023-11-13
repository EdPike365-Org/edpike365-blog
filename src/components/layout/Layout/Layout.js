import React from "react"
import AppWrapper from "../AppWrapper"
import LayoutGrid from "../LayoutGrid"
import NavHeader from "../nav-header/NavHeader"
import NavBar from "../nav-bar/NavBar"
import Main from "../main/Main"

const Layout = (props) => {
   
  return (
    <AppWrapper>
      <LayoutGrid>
        <NavHeader />
        <NavBar />        
        <Main {...props} />
      </LayoutGrid>
    </AppWrapper>
  )
}

export default Layout
