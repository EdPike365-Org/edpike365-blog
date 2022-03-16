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
          <NavLink usegatsby="true" to={"/"} itemProp="url">
            Home
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink usegatsby="true" to={"/edpike365-about/"} itemProp="url">
            About
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink usegatsby="true" to={"/bloglist/"} itemProp="url">
            Blog
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink usegatsby="true" to={"/contact/"} itemProp="url">
            Contact
          </NavLink>
        </NavLI>
        <NavSubMenu
          title={"FRONT END"}
          uuid={"b2cea402-c66f-11eb-b8bc-0242ac130003"}
        >
          <NavLI>
            <NavLink
              usegatsby="true"
              to={"/edpike365-front-end#html-css-js"}
              itemProp="url"
            >
              HTML, CSS, JS
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink
              usegatsby="true"
              to={"/edpike365-front-end#design"}
              itemProp="url"
            >
              Design
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink
              usegatsby="true"
              to={"/edpike365-front-end#uiframeworks"}
              itemProp="url"
            >
              UI Frameworks
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink
              usegatsby="true"
              to={"/edpike365-front-end#auth"}
              itemProp="url"
            >
              Client Auth
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink
              usegatsby="true"
              to={"/edpike365-front-end#build"}
              itemProp="url"
            >
              Build Tools
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink
              usegatsby="true"
              to={"/edpike365-front-end#testing"}
              itemProp="url"
            >
              Testing
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavSubMenu
          title={"BACK END"}
          uuid={"eb7371e2-ea28-4eee-85fd-79d1f7a5155b"}
        >
          <NavLI>
            <NavLink to={"/edpike365-back-end#web-servers"} itemProp="url">
              Web Servers
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-back-end#app-servers"} itemProp="url">
              App Servers
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-back-end#apis"} itemProp="url">
              APIs
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-back-end#databases"} itemProp="url">
              Databases
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-back-end#auth-services"} itemProp="url">
              Auth Service
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavSubMenu title={"DEVOPS"} uuid={"b2cea402-c66f-11eb-b8bc"}>
          <NavLI>
            <NavLink to={"/edpike365-devops/"} itemProp="url">
              The Spice
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-devops#plan"} itemProp="url">
              Plan
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-devops#vc"} itemProp="url">
              Version Ctrl
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-devops#build"} itemProp="url">
              Build
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-devops#cicd"} itemProp="url">
              CI/CD
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-devops#ops"} itemProp="url">
              Operate
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-devops#feedback"} itemProp="url">
              Feedback
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavSubMenu title={"SYSOPS"} uuid={"b2cea402-c66f-8008-b8bc"}>
          <NavLI>
            <NavLink to={"/edpike365-sysops#vs"} itemProp="url">
              SysOps vs SRE
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-sysops#sysops"} itemProp="url">
              SysOps
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-sysops#sre"} itemProp="url">
              SRE
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-sysops#iac"} itemProp="url">
              IaC, EaC
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-sysops#infrastructure"} itemProp="url">
              Infrastructure
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavSubMenu title={"CONTAINERS"} uuid={"b2cea402-c66f-8128-b8bc"}>
          <NavLI>
            <NavLink to={"/edpike365-containers#oci-docker"} itemProp="url">
              OCI, Docker
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink
              to={"/edpike365-containers#kubernetes-container-orchestration"}
              itemProp="url"
            >
              Kubernetes
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink
              to={"/edpike365-containers#hosting-providers"}
              itemProp="url"
            >
              Hosting
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
    </Nav>
  )
}

export default NavBar
