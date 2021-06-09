import React from "react"
import Wrapper from "./AppWrapper"
import LayoutGrid from "./LayoutGrid"
import Main from "./Main"
import NavHeader from "../nav/NavHeader"
import NavBar from "../nav/NavBar"

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <LayoutGrid>
        <NavHeader />
        <NavBar />
        <Main>{children}</Main>
      </LayoutGrid>
    </Wrapper>
  )
}

export default Layout
