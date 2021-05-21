import React from "react"
import { Global } from "@emotion/react"
import { coreTheme } from "../styles/coreTheme.js"
import LayoutGrid from "./LayoutGrid"
import Header from "./Header"
import NavBar from "./NavBar"
import SideBar from "./SideBar"
import Main from "./Main"
import Footer from "./Footer"
import { NavContextProvider} from "../contexts/NavContext"
import { ThemeContextListener } from "../components/ThemeSetters"

const Layout = ( {children}) => {

  // If we are on the home page, make the logos not be links
  // I'm only doing this as a demonstration
  // location object must be passed from pages into components
  /*
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
*/
  return (
    <NavContextProvider >
      <ThemeContextListener/>
      <LayoutGrid >
        <Header />
        <NavBar />
        <Main>{children}</Main>
        <SideBar />
        <Footer />
      </LayoutGrid>
    </NavContextProvider>
  )
}

export default Layout
