import React, { useContext } from "react"
import { Nav, NavUL, SubUL, NavLI, NavLink } from "./NavComps"
import { NavSubMenu } from "./NavSubMenu"
import { NavContext } from "../contexts/NavContext"

const NavBar = () => {
  const { showNavState } = useContext(NavContext)
  const [showNav] = showNavState;
  
  return (
    <Nav showNav={showNav} >
      <NavUL>
        <NavLI>
          <NavLink to={"/"} itemProp="url">
            Home
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={"/about/"} itemProp="url">
            About
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={"/bloglist/"} itemProp="url">
            Blog
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={"/contact/"} itemProp="url">
            Contact
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={"/settings/"} itemProp="url">
            Settings
          </NavLink>
        </NavLI>
        <NavSubMenu
          title={"FRONT END"}
          uuid={"b2cea402-c66f-11eb-b8bc-0242ac130003"}
        >
          <NavLI>
            <NavLink to={"/frontend/"} itemProp="url">
              HTML, CSS, JS
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/frontend/"} itemProp="url">
              React, Emotion
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/frontend/"} itemProp="url">
              Gatsby
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/frontend/"} itemProp="url">
              SEO
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <SubUL>
          BACK END
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              REST, GraphQL
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              Login and Auth
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              Java, JUnit
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              CRUD Forms
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              SQL, RDMS
            </NavLink>
          </NavLI>
        </SubUL>
      </NavUL>
    </Nav>
  )
}

export default NavBar
