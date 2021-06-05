import React from "react"
import Wrapper from "./Wrapper"
import LayoutGrid from "./LayoutGrid"
import Header from "./Header"
import NavBar from "./NavBar"
import Main from "./Main"
import { NavContextProvider } from "../contexts/NavContext"

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <NavContextProvider>
        <LayoutGrid>
          <Header />
          <NavBar />
          <Main>{children}</Main>
        </LayoutGrid>
      </NavContextProvider>
    </Wrapper>
  )
}

export default Layout
