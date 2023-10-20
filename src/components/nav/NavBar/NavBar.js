import React, { useContext } from "react"
import { Nav } from "./Nav"
import { NavUL } from "./NavUL"
import { NavLI } from "./NavLI"
import NavLink from "./NavLink"
import { NavSubMenu } from "./NavSubMenu/NavSubMenu"
import { NavContext } from "../../../contexts/NavContext"

const NavBar = () => {
  // This NavBar uses read-only state from NavContext.
  // The state is set with the hamburger button in the NavHeader component.
  // Each NavSubMenu has to have a unique UUID to keep track of its open/closed state.
  const { showNavState } = useContext(NavContext)
  const [showNav] = showNavState

  // Each NavSubMenu has to have a unique UUID to keep track of its open/closed state.
  return (
    <Nav id="mainNav" showNav={showNav}>
      <NavUL>
        <NavLI>
          <NavLink to={"/"} itemProp="url" partiallyActive={false}>
            Home
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={"/contact/"} itemProp="url">
            Contact
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={"/bloglist/"} itemProp="url">
            Blog
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={"/edpike365-portfolio/"} itemProp="url">
            Portfolio
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={"/edpike365-about-site/"} itemProp="url">
            About Site
          </NavLink>
        </NavLI>
        <NavSubMenu
          title={"ABOUT ME"}
          navTarget={"/edpike365-about-me-now"}
          uuid={"NavSubMenu-ABOUT"}
        >
          <NavLI>
            <NavLink to={"/edpike365-about-me-now/"} itemProp="url">
              Now
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-about-me-near/"} itemProp="url">
              Near Future
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-certs-classes/"} itemProp="url">
              Certs and Classes
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-about-me-past/"} itemProp="url">
              Past
            </NavLink>
          </NavLI>
        </NavSubMenu>

        <NavSubMenu
          title={"FRONT END"}
          navTarget={"/edpike365-front-end"}
          uuid={"NavSubMenu-FRONT-END"}
        >
          <NavLI>
            <NavLink
              to={"/edpike365-front-end#html-css-js"}
              itemProp="url"
              partiallyActive={true}
            >
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
        <NavSubMenu
          title={"BACK END"}
          navTarget={"/edpike365-back-end"}
          uuid={"NavSubMenu-BACK-END"}
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
        <NavSubMenu
          title={"DEVOPS"}
          navTarget={"/edpike365-devops"}
          uuid={"NavSubMenu-DEVOPS"}
        >
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
        <NavSubMenu
          title={"SYSOPS"}
          navTarget={"/edpike365-sysops"}
          uuid={"NavSubMenu-SYSOPS"}
        >
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
        <NavSubMenu
          title={"CONTAINERS"}
          navTarget={"/edpike365-containers"}
          uuid={"NavSubMenu-CONTAINERS"}
        >
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
        <NavSubMenu
          title={"AI, MLOps"}
          navTarget={"/edpike365-mlops"}
          uuid={"NavSubMenu-CONTAINERS"}
        >
          <NavLI>
            <NavLink to={"/edpike365-ai/"} itemProp="url">
              AI, ML
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-mlops/"} itemProp="url">
              MLOps
            </NavLink>
          </NavLI>
          <NavLI>
            <NavLink to={"/edpike365-dataops/"} itemProp="url">
              DataOps
            </NavLink>
          </NavLI>
        </NavSubMenu>
        <NavLI>
          <NavLink to={"/site-settings/"} itemProp="url">
            Site Settings
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={"/account/"} itemProp="url">
            Account
          </NavLink>
        </NavLI>
      </NavUL>
    </Nav>
  )
}

export default NavBar
