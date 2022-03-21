import React, { useContext } from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { NavContext } from "../../../contexts/NavContext"

// These are the styles for each nav component type.

/* 
Nav is the outermost container.
It is hidden in smaller screens and controlled by the hamburger button.
Nav is always open/visible on larger screens.
TODO: It should **slide** open and closed but currently does not.
-Open anim: this should be working but is not. 
-Closing anim: In Gatsby prod, the whole page is reloaded when a link is clicked, 
 so we'd have to add a delay before the click is registered by the Gatsby Link.
*/

// Mobile First Design: Default size is for old small phones, width < 320px
// If it works there, it works anywhere.
export const Nav = styled.nav`
  grid-area: nav;

  flex-direction: column;

  overflow: auto;

  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
  background-color: var(--color-background-paper);

  /* TODO make drop shadow to the right of nav bar work */
  /*box-shadow: var(--shape-box-shadow);*/

  /* used further below for slide in slide out animation */
  @keyframes OPEN-RIGHT-100 {
    0% {
    }
    100% {
      transform: scaleX(1);
    }
  }

  /* Hide/Close the nav bar unless showNav is true */
  /* the code below is for navbar slide in, slide out animation, not currently working */
  /* transform-origin: left;*/
  /* transition: width 800ms ease-in-out; */
  /* transform: ${props => (props.showNav ? "scaleX(1)" : "scaleX(0)")}; */
  /* ${props =>
    props.showNav
      ? "animation: OPEN-RIGHT-100 5s ease-out;"
      : "transform: scaleX(0);"} 
  */

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  /* When nav is shown, is full width and SHOULD BE full height */
  width: 100%;
  height: 100%;
  min-height: 100%;
  font-weight: 600;
  ${props => (props.showNav ? "display: flex; height: 100%;" : "display:none;")}

  /* ---- Normal Phones (320 x ) ---- */
  @media only screen and (min-width: 320px) {
    font-size: 1.5rem;
    font-weight: 700;
  }

  /* ---- Tablet (700 x ) ---- */
  /* Still hiding nav and showing hamburger button, but fonts are bigger */
  /* Also, the top navheader is taller so navbar has to start lower down */
  @media only screen and (min-width: 700px) {
    width: 300px;
    min-width: 200px;
  }

  /* ---- LapTop (1366 x ) ---- */
  /* show the nav bar fixed open on the left */
  @media only screen and (min-width: 1366px) {
    display: flex;

    /* if the nav div is hidden (showNav is false) in tablet/mobile mode, 
      and we grow the screen to desktop mode, we have to overide the slow transition that opens the nav 
      or we get a white flash before the navbar fills the newly created nav void on the left side of the screen
      OR we could maybe color in the navbar background.
      transition-duration: 0s;
      transition: transform 0ms; 
    */

    /* the color transition has to be down here or somehow the transform one overwrites it */
    /* transition: color 400ms ease-in-out, background-color 400ms ease-in-out; */
  }
`

/* top level category: should only head a list of NavLI children */
/* SubUL is always static, the expandable NavBarSubMenu looks the same but the button has its own css */
export const SubUL = styled.ul`
  list-style-type: none;
  letter-spacing: var(--font-letter-spacing-overline);
  padding: 0.5rem 1rem;
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
`

/* NavLI are used by the SubUL and the button expandable component */
export const NavLI = styled.li`
  padding: 0.5rem 0.5rem 0.5rem 1rem;
`
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
