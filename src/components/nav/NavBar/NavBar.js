import React, { useContext } from "react"
import { Nav, NavUL, NavLI, NavLink } from "./NavBarComps"
import { NavSubMenu } from "./NavBarSubMenu"
import { NavContext } from "../../../contexts/NavContext"

const NavBar = () => {
  // This NavBar uses read-only state from NavContext.
  // The state is set with the hamburger button in the NavHeader component.
  // Each NavSubMenu has to have a unique UUID to keep track of its open/closed state.
  const { showNavState } = useContext(NavContext)
  const [showNav] = showNavState

  // The line breaks at bottom are there to handle too short scroll bars on short screens
  return (
    <Nav showNav={showNav}>
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
              UI Frameworks
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              Client Auth
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/frontend/"} itemProp="url">
              Testing
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavSubMenu
          title={"BACK END"}
          uuid={"eb7371e2-ea28-4eee-85fd-79d1f7a5155b"}
        >
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              Web App Servers
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              APIs
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              Databases
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              Auth Service
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavSubMenu title={"DEVOPS"} uuid={"b2cea402-c66f-11eb-b8bc"}>
          <NavLI>
            <NavLink to={"/devops/"} itemProp="url">
              CI/CD Pipeline
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/devops/"} itemProp="url">
              Containers
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              Msg. Buses
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/devops/"} itemProp="url">
              Monitoring
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/devops/"} itemProp="url">
              Infr. as Code
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavSubMenu title={"X-CUTTING"} uuid={"b2cea402-c66f-8008-b8bc"}>
          <NavLI>
            <NavLink to={"/devops/"} itemProp="url">
              Principles
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/backend/"} itemProp="url">
              Version Control
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/devops/"} itemProp="url">
              EaC
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavLI>
          <NavLink to={"/settings/"} itemProp="url">
            Settings
          </NavLink>
        </NavLI>
      </NavUL>
      <br />
      <br />
      <br />
      <br />
    </Nav>
  )
}

export default NavBar
