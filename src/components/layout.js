import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  let header

  // This just makes the title a string if you are on the homepage, or...
  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        <Link to={"/bloglist/"} itemProp="url">Blog List</Link>,
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby v3</a>, ({`${process.env.NODE_ENV}`} mode)
      </footer>
    </div>
  )
}

export default Layout
