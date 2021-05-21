import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"

export const Nav = styled.nav`
  grid-area: nav;

  background-color: var(--color-background-paper);
  box-shadow: var(--shape-box-shadow);

  position: absolute;
  top: var(--header-height-mobile);
  bottom: 0%; /* by using this vs height 100%, we get no vert scroll bar */
  width: 100%;

  /* this block is manipulated by the LayoutGrid */
  /* display: ${props => (props.showNav ? "flex" : "none")}; */
  transform: ${props => (props.showNav ? "scale(1,1)" : "scale(0,1)")};
  transform-origin: left;
  transition: transform 0.3s ease-out;

  z-index: 950;
  font-size: 1.5rem;

  overflow: auto;
`

const NavBar = (props) => {
  const Ul = styled.ul`
    color: var(--color-primary-dark);
    list-style-type: none;
    margin: 0;
    padding: 0;
  `
  const SubUL = styled.ul`
    list-style-type: none;
    letter-spacing: var(--font-letter-spacing-overline);
    padding: 0.5rem 1rem;
  `

  const Li = styled.li`
    padding: 0.5rem 0.5rem 0.5rem 1rem;
  `
  /* renaming LINK to LinK with PascalCase to avoid lint warning :-( */
  /* this uses the props to className overrided functionality of Emotion */
  const LinK = styled(props => <Link {...props} />)`
    color: var(--color-text-secondary);
    text-decoration: none;

    :hover {
      color: var(--color-text-primary);
    }

    /* preserve space for the active arrow with invisible arrow */
    ::after {
      white-space: pre;
      color: var(--color-background-paper);
      content: " >";
    }

    :active::after {
      color: var(--color-text-primary);
      content: " >";
    }
  `

  return (
    <Nav props={props}>
      <Ul>
        <Li>
          <LinK to={"/"} itemProp="url">
            Home
          </LinK>
          <span></span>
        </Li>
        <Li>
          <LinK to={"/about/"} itemProp="url">
            About
          </LinK>
        </Li>
        <Li>
          <LinK to={"/bloglist/"} itemProp="url">
            Blog
          </LinK>
        </Li>
        <Li>
          <LinK to={"/contact/"} itemProp="url">
            Contact
          </LinK>
        </Li>
        <SubUL>
          FRONT END
          <Li>
            <LinK to={"/frontend/"} itemProp="url">
              HTML, CSS, JS
            </LinK>
          </Li>
          <Li>
            <LinK to={"/frontend/"} itemProp="url">
              React, Emotion
            </LinK>
          </Li>
          <Li>
            <LinK to={"/frontend/"} itemProp="url">
              Gatsby
            </LinK>
          </Li>
          <Li>
            <LinK to={"/frontend/"} itemProp="url">
              SEO
            </LinK>
          </Li>
        </SubUL>
        <SubUL>
          BACK END
          <Li>
            <LinK to={"/backend/"} itemProp="url">
              REST, GraphQL
            </LinK>
          </Li>
          <Li>
            <LinK to={"/backend/"} itemProp="url">
              Login and Auth
            </LinK>
          </Li>
          <Li>
            <LinK to={"/backend/"} itemProp="url">
              Java, JUnit
            </LinK>
          </Li>
          <Li>
            <LinK to={"/backend/"} itemProp="url">
              CRUD Forms
            </LinK>
          </Li>
          <Li>
            <LinK to={"/backend/"} itemProp="url">
              SQL, RDMS
            </LinK>
          </Li>
        </SubUL>
        <Li>
          <LinK to={"/settings/"} itemProp="url">
            Settings
          </LinK>
        </Li>
      </Ul>
    </Nav>
  )
}

export default NavBar
