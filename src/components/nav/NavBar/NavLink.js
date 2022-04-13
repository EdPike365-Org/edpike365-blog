import React, { useContext } from "react"
import { Link } from "gatsby"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { NavContext } from "../../../contexts/NavContext"

// Used by StyledGatsbyLink and StyledHREF
const navLinkStyle = css`
  color: var(--color-text-secondary);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  :hover {
    color: var(--color-text-primary);
    border-bottom: 2px solid var(--color-primary-dark);
  }

  /* preserve space for the active arrow with invisible arrow */
  ::after {
    white-space: pre;
    color: var(--color-background-paper);
    content: " >";
    display: none;
  }

  :active::after {
    color: var(--color-text-primary);
    content: " >";
    display: inline;
  }
`

/* this uses the "props to className" override functionality of Emotion */
const StyledGatsbyLink = styled(props => <Link {...props} />)`
  ${navLinkStyle}
`

// When we click on a nav link, we want to close/hide the nav bar if it is open
// The nav bar has other code that will keep it open if the screen is wide enough
// https://github.com/brohlson/gatsby-plugin-anchor-links
export const NavLink = props => {
  //showNavState is a state nested in the NavContext context
  // TODO rename showNatState to showNavBarState
  const { showNavState } = useContext(NavContext)
  const toggleShowNav = showNavState[1] //[0] is the state, [1] is the setter

  if (props.useNativeLink) {
    return (
      <a css={navLinkStyle} href={props.to} onClick={toggleShowNav}>
        {props.children}
      </a>
    )
  }

  return <StyledGatsbyLink {...props} onClick={toggleShowNav} />
}
