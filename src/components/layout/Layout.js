import React from "react"
import Wrapper from "./AppWrapper"
import LayoutGrid from "./LayoutGrid"
import Main from "./Main"
import NavHeader from "../nav/NavHeader"
import NavBar from "../nav/NavBar"

const Layout = (props) => {
   
  return (
    <Wrapper>
      <LayoutGrid>
        <NavHeader />
        <NavBar />
        <Main {...props} />
      </LayoutGrid>
    </Wrapper>
  )
}

export default Layout
