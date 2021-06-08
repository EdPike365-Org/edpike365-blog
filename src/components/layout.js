import React from "react"
import Wrapper from "./AppWrapper"
import LayoutGrid from "./LayoutGrid"
import NavHeader from "./NavHeader"
import NavBar from "./NavBar"
import Main from "./Main"

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
