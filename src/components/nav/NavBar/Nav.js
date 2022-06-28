import React from "react"
import { keyframes, css } from "@emotion/react"

/* 
Nav is the outermost container.
It is hidden in smaller screens and controlled by the hamburger button.
Nav is always open/visible on larger screens.
TODO: It should **slide** open and closed but currently does not.
-Open anim: this should be working but is not. 
-Closing anim: In Gatsby prod, the whole page is reloaded when a link is clicked, 
 so we'd have to add a delay before the click is registered by the Gatsby Link.
*/

const slideRightKeyframes = keyframes`
    0% {
    }
    100% {
    transform: scaleX(1);
    }
`

/* 
    The code below is for navbar slide in, slide out animation
    Not currently working 
*/
/*eslint-disable */
const slideRightAnimation = showNav => css`
  transform-origin: left;
  transition: width 800ms ease-in-out;
  transform: ${showNav ? "scaleX(1)" : "scaleX(0)"};
  ${showNav
    ? "animation: OPEN-RIGHT-100 5s ease-out;"
    : "transform: scaleX(0);"}

  animation: ${slideRightKeyframes} 1s ease-out;
`
/*eslint-enable */

// Mobile First Design: Default size is for old small phones, width < 320px
// If it works there, it works anywhere.
const navCSS = props => css`
  grid-area: nav;

  flex-direction: column;

  overflow: auto;

  /* This covers the scrollToTop button, etc */
  z-index: 990;

  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
  background-color: var(--color-background-paper);

  /* TODO make drop shadow to the right of nav bar work */
  /*box-shadow: var(--shape-box-shadow);*/

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  /* When nav is shown, is full width and SHOULD BE full height (minus NavHeader) */
  width: 100%;
  height: 100%;
  /* the var(--header-height-x) has to agree with the media query settings in GridLayout */
  min-height: calc(100vh - var(--header-height-tiny));
  font-weight: 600;
  ${props.showNav ? "display: flex; height: 100%;" : "display:none;"}

  /* ---- Normal Phones (320 x ) ---- */
  @media only screen and (min-width: 320px) {
    font-size: 1.5rem;
    font-weight: 700;
    min-height: calc(100vh - var(--header-height-mobile));
  }

  /* ---- Tablet (700 x ) ---- */
  /* Still hiding nav and showing hamburger button, but fonts are bigger */
  /* Also, the top navheader is taller so navbar has to start lower down */
  @media only screen and (min-width: 700px) {
    width: 300px;
    min-width: 200px;
    min-height: calc(100vh - var(--header-height-tablet));
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

export const Nav = props => {
  return <nav css={navCSS(props)}>{props.children}</nav>
}
