import React, { useContext } from 'react'
import Nav from '../Nav'
import NavUL from '../NavUL'
import NavLI from '../NavLI'
import NavLink from '../NavLink'
import NavSubMenu from '../NavSubMenu'
import { NavContext } from '../../../../contexts/NavContext'

// https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/

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
          <NavLink to={'/'} itemProp="url" partiallyActive={false}>
            Home
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={'/contact/'} itemProp="url">
            Contact
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={'/bloglist/'} itemProp="url">
            Blog
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={'/portfolio/'} itemProp="url">
            Portfolio
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={'/about-site/'} itemProp="url">
            About Site
          </NavLink>
        </NavLI>
        <NavLI>
          <NavSubMenu title={'ABOUT ME'} uuid={'NavSubMenu-ABOUT'} defaultOpen>
            <NavLI>
              <NavLink to={'/about-me-now/'} itemProp="url">
                Now
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/about-me-near/'} itemProp="url">
                Near Future
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/certs-classes/'} itemProp="url">
                Certs and Classes
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/about-me-past/'} itemProp="url">
                Past
              </NavLink>
            </NavLI>
          </NavSubMenu>
        </NavLI>
        <NavLI>
          <NavSubMenu title={'FRONT END'} uuid={'NavSubMenu-FRONT-END'}>
            <NavLI>
              <NavLink
                to={'/front-end#top'}
                itemProp="url"
                partiallyActive={true}
              >
                HTML, CSS, JS
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/front-end#design'} itemProp="url">
                Design
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/front-end#ui-frameworks'} itemProp="url">
                UI Frameworks
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink
                to={'/front-end#client-side-authentication-authorization'}
                itemProp="url"
              >
                Client Auth
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/front-end#build-tools'} itemProp="url">
                Build Tools
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/front-end#testing'} itemProp="url">
                Testing
              </NavLink>
            </NavLI>
          </NavSubMenu>
        </NavLI>
        <NavLI>
          <NavSubMenu title={'BACK END'} uuid={'NavSubMenu-BACK-END'}>
            <NavLI>
              <NavLink to={'/back-end#top'} itemProp="url">
                Web Servers
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/back-end#app-servers'} itemProp="url">
                App Servers
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/back-end#apis'} itemProp="url">
                APIs
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/back-end#databases'} itemProp="url">
                Databases
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/back-end#auth-services'} itemProp="url">
                Auth Services
              </NavLink>
            </NavLI>
          </NavSubMenu>
        </NavLI>
        <NavLI>
          <NavSubMenu title={'DEVOPS'} uuid={'NavSubMenu-DEVOPS'}>
            <NavLI>
              <NavLink to={'/devops#top'} itemProp="url">
                The Spice
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/devops#designplan'} itemProp="url">
                Plan
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/devops#version-control'} itemProp="url">
                Version Ctrl
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/devops#build-test-coverage'} itemProp="url">
                Build
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/devops#cicd-tools'} itemProp="url">
                CI/CD
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/devops#operations'} itemProp="url">
                Operations
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/devops#monitor'} itemProp="url">
                Monitor
              </NavLink>
            </NavLI>
          </NavSubMenu>
        </NavLI>
        <NavLI>
          <NavSubMenu title={'SYSOPS'} uuid={'NavSubMenu-SYSOPS'}>
            <NavLI>
              <NavLink to={'/sysops#top'} itemProp="url">
                SysOps vs SRE
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/sysops#sysops'} itemProp="url">
                SysOps
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink
                to={'/sysops#sre-site-reliability-engineering'}
                itemProp="url"
              >
                SRE
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink
                to={'/sysops#sre-site-reliability-engineering'}
                itemProp="url"
              >
                FinOPs
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/sysops#iac-eac'} itemProp="url">
                IaC, EaC
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/sysops#infrastructure'} itemProp="url">
                Infrastructure
              </NavLink>
            </NavLI>
          </NavSubMenu>
        </NavLI>
        <NavLI>
          <NavSubMenu title={'CONTAINERS'} uuid={'NavSubMenu-CONTAINERS'}>
            <NavLI>
              <NavLink to={'/containers#top'} itemProp="url">
                OCI, Docker
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink
                to={'/containers#kubernetes-container-orchestration'}
                itemProp="url"
              >
                Kubernetes
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/containers#hosting-providers'} itemProp="url">
                Hosting
              </NavLink>
            </NavLI>
          </NavSubMenu>
        </NavLI>
        <NavLI>
          <NavSubMenu title={'AI and *Ops'} uuid={'NavSubMenu-AI-MLOPS'}>
            <NavLI>
              <NavLink to={'/ai#top'} itemProp="url">
                AI, ML
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/mlops/'} itemProp="url">
                MLOps
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/mlops/'} itemProp="url">
                LLMOps, RLHF
              </NavLink>
            </NavLI>
            <NavLI>
              <NavLink to={'/dataops/'} itemProp="url">
                DataOps
              </NavLink>
            </NavLI>
          </NavSubMenu>
        </NavLI>
        <NavLI>
          <NavLink to={'/site-settings/'} itemProp="url">
            Site Settings
          </NavLink>
        </NavLI>
        <NavLI>
          <NavLink to={'/account/'} itemProp="url">
            Account
          </NavLink>
        </NavLI>
      </NavUL>
    </Nav>
  )
}

export default NavBar
