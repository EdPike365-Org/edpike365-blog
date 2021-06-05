import React, { useContext } from "react"
import styled from "@emotion/styled"
import { NavContext } from "../contexts/NavContext"
import { StyledHeader } from "./Header"
import { Nav } from "./NavBar"
import { HamButton } from "./HamburgerButton"
import { LogoDiv, SlideLogoDivLeft } from "./Header"
import { SideBarDiv } from "./SideBar"

/*
    I had a huge bug here. This layout grid component was defined in the Layout.js. 
    The useContext call was made in Layout.js.
    The NavContext provider was providing showNav, but when I clicked the button to 
    toggle showNav, the render code for this component would not be called. So, only 
    the initial state of showNav was rendered. It was all because the useContext() was in
    the ***Layout*** component, so LayoutGrid component was not considered registered as a listener.
    All I had to do was move this component into its own class and call useContext here.
  */

/* By default we are in Mobile mode, nav is hidden, page should load faster for mobile */
const GlobalGridDiv = styled.div`
  /* height vh is necessary to establish a location for header and footer on page load, so they can be sticky */
  height: 100vh;

  overflow-y: hidden;

  display: grid;
  gap: 0px;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "content";

    /* TODO: figure out how to pass the props into the actual Nav component */
    ${Nav} {
      transform: ${props => (props.showNav ? "scale(1,1)" : "scale(0,1)")};
    }

    ${SideBarDiv} {
      display: none;
    }

  /*-------------------- Tablet  --------------------*/
  /* TODO! make hamburger appear first, make logo appear second so it does not mover over to right after hamburger */
  /* tablet-ish, I can't get the var(--xyz) to work, so hard coded */
  @media only screen and (min-width: 768px) {
    
    /* using auto keeps the sidebar from growing and let the content take all the space */
    grid-template-columns: minmax(min-content, max-content) minmax(
        75%,
        max-content
      );
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header  header"
      "sidebar content"
      "footer  footer";

    /* make the header height a little bigger so we can fit the logo icon and bigger font */
    ${StyledHeader} {
      height: var(--header-height-tablet);
    }

    /* show the logo icon */
    ${LogoDiv} {
      & > a > span:nth-of-type(1) {
        display: flex;
      }
    }

    ${Nav} {
      transform: ${props => (props.showNav ? "scale(1,1)" : "scale(0,1)")};
      top: var(--header-height-tablet);
    }

    ${SideBarDiv} {
      display: flex;
    }

  }

  /*-------------------- LapTop  --------------------*/
  @media only screen and (min-width: 1366px) {
    /* using auto keeps the nav and sidebar from growing and let the content take all the space */
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header header header"
      "nav content sidebar"
      "footer footer footer";


    /* show the nav bar fixed open on the left */
    ${Nav} {
      /* 
      OMG, I had quotes on "flex" here and it would not work, but it did not tell me 
      because it is not "compiled". But for some reason, it would obey the props.showNav on first render, 
      I'm guessing because that was the last legit setting because it did NOT have the quotes 
      */
      display: flex;
      position: static; /* the smaller media sizes above are absolute */

      /* it was hidden off to the left, we have to bring it back, setting display to flex is not doing it */
      transform: translateX(0);

      /* if the nav div is hidden (showNav is false) in tablet/mobile mode, and we grow the screen to desktop mode
        we have to overide the slow transition that opens the nav 
        or we get a white flash before the navbar fills the newly created nav void on the left side of the screen
      */
      transition-duration: 0s;
    }

    ${HamButton} {
      display: none;
    }

    /* keeping to show how to apply animation to move logo to left */
    ${LogoDiv}{
      /* animation: ${SlideLogoDivLeft} 2s ease-in-out; */
      margin-right: auto;

    }
    
  }
`

const LayoutGrid = ({ children }) => {
  const { showNav } = useContext(NavContext)
  return <GlobalGridDiv showNav={showNav}>{children}</GlobalGridDiv>
}

export default LayoutGrid
