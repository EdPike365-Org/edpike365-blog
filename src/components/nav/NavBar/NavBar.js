import React, { useContext } from "react"
import { Nav } from "./Nav"
import { NavLink } from "./NavLink"
import { NavUL } from "./NavUL"
import { NavLI } from "./NavBarComps"
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
    <Nav id="mainNav" showNav={showNav}>
      <NavUL id="mainNavUL">
        <NavLI>
          <NavLink to={"/"} itemProp="url">
            Home
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={"/edpike365-about/"} itemProp="url">
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
        <NavSubMenu title={"FRONT END"} uuid={"NavSubMenu-FRONT-END"}>
          <NavLI>
            <NavLink to={"/edpike365-front-end#html-css-js"} itemProp="url">
              HTML, CSS, JS
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-front-end#design"} itemProp="url">
              Design
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-front-end#ui-frameworks"} itemProp="url">
              UI Frameworks
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink
              to={
                "/edpike365-front-end#client-side-authentication-authorization"
              }
              itemProp="url"
            >
              Client Auth
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-front-end#build-tools"} itemProp="url">
              Build Tools
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-front-end#testing"} itemProp="url">
              Testing
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavSubMenu title={"BACK END"} uuid={"NavSubMenu-BACK-END"}>
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
        <NavSubMenu title={"DEVOPS"} uuid={"NavSubMenu-DEVOPS"}>
          <NavLI>
            <NavLink to={"/edpike365-devops/#top"} itemProp="url">
              The Spice
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-devops#designplan"} itemProp="url">
              Plan
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-devops#version-control"} itemProp="url">
              Version Ctrl
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink
              to={"/edpike365-devops#build-test-coverage"}
              itemProp="url"
            >
              Build
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-devops#cicd-tools"} itemProp="url">
              CI/CD
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-devops#operations"} itemProp="url">
              Operations
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-devops#monitor"} itemProp="url">
              Monitor
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavSubMenu title={"SYSOPS"} uuid={"NavSubMenu-SYSOPS"}>
          <NavLI>
            <NavLink to={"/edpike365-sysops#sysops-vs-sre"} itemProp="url">
              SysOps vs SRE
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-sysops#sysops"} itemProp="url">
              SysOps
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink
              to={"/edpike365-sysops#sre-site-reliability-engineering"}
              itemProp="url"
            >
              SRE
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-sysops#iac-eac"} itemProp="url">
              IaC, EaC
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-sysops#infrastructure"} itemProp="url">
              Infrastructure
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavSubMenu title={"CONTAINERS"} uuid={"NavSubMenu-CONTAINERS"}>
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
    </Nav>
  )
}

export default NavBar
