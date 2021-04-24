import * as React from "react"
import { Global, css } from "@emotion/react"
import styled from "@emotion/styled"
import { normalizeCSS } from '../styles/normalizeCSS.js'
import { customStyles } from "../styles/customStyles.js"

import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const header = (
    <>
      <Link className="header-link-home" to="/">
        {title}
      </Link>
      <span style={{float:"right"}} >
      <Link to={"/bloglist/"} itemProp="url">Blog</Link>
      </span>
    </>
  )

  const footer = (
    <>
    © {new Date().getFullYear()}, Built with
    {` `}
    <a href="https://www.gatsbyjs.com">Gatsby v3</a>, ({`${process.env.NODE_ENV}`} mode)
    </>
  )

  // not matter where we put global styles, it will be inserted at the top level
  // the global component just injects the css into global
  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Global styles={ [normalizeCSS, customStyles]  } /> 
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
      </div>
  )
}

export default Layout
