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
    "content"
    "footer";

  ${StyledHeader} {
    height: var(--header-height-mobile);
    padding-top: 0rem;
    padding-bottom: 0rem;
    padding-left: 1rem;
    padding-right: 1 rem;
  }

  /* hide the logo icon */
  ${LogoDiv} {
    & > a > span:first-of-type {
      display: none;
    }
    & > a > span:nth-of-type(2) {
      font-size: 2.5rem;
    }
  }

  /* By default we are in Mobile mode, nav is hidden, page should load faster for mobile */
  ${Nav} {
    /* display: ${props => (props.showNav ? "flex" : "none")}; */
    
    position: absolute;
    top: var(--header-height-mobile);
    bottom: 0%; /* using this vs height 100%, we get no vert scroll bar */
    width: 100%;

    transform: ${props => (props.showNav ? "scale(1,1)" : "scale(0,1)")};
    transform-origin: left;
    transition: transform 0.4s ease-out;
  }

  ${SideBarDiv} {
    display: none;
  }

  /* tablet-ish, I can't get the var(--xyz) to work, so hard coded */
  @media only screen and (min-width: 640px) {
    /* using auto keeps the sidebar from growing and let the content take all the space */
    grid-template-columns: minmax(min-content, max-content) minmax(75%, max-content);
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header  header"
      "sidebar content"
      "footer  footer";

    ${StyledHeader} {
      height: var(--header-height-laptop);
      padding-top: 0rem;
      padding-bottom: 0rem;
    }
    /* show the logo icon */
    ${LogoDiv} {
      & > a > span:nth-of-type(1) {
        display: flex;
      }
    }

    /* grow the logo text font */

    /* hide the nav bar unless the nav button is on */
    ${Nav} {
      position: absolute;
      top: var(--header-height-laptop);
      bottom: 0%; /* using this vs height 100%, we get no vert scroll bar */
      width: 100%;

      /* this has to be here or it blinks when you reduce width 
      display: ${props => (props.showNav ? "flex" : "flex")}; 
      */
      transform: ${props => (props.showNav ? "scale(1,1)" : "scale(0,1)")};
      transform-origin: left;
      transition: transform 0.2s ease-out;
    }

    ${SideBarDiv} {
      display: flex;
    }
  }

  /* desktop */
  @media only screen and (min-width: 1280px) {
    /* using auto keeps the nav and sidebar from growing and let the content take all the space */
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header header header"
      "nav content sidebar"
      "footer footer footer";

    /* show the nav bar fixed on the left */
    ${Nav} {
      /* 
      OMG, I had quotes on "flex" here and it would not work, but it did not tell me 
      because it is not "compiled". But for some reason, it would obey the props.showNav, 
      I'm guessing because that was the last legit setting because it did NOT have the quotes 
      */
      display: flex;
      position: static; /* smaller sizes are absolute */

      /* it was hidden off to the left, we have to bring it back, setting display to flex is not doing it */
      transform: translateX(0);
      /* we have to do this to overide the slow transition or we get a white flash */
      transition-duration: 0s;
    }

    ${HamButton} {
      display: none;
    }

    /* keeping to show how to apply animation
    ${LogoDiv}{
      animation: ${SlideLogoDivLeft} 2s ease infinite;
    }
    */
  }
`

const LayoutGrid = ({ children }) => {
  const { showNav } = useContext(NavContext)
  return <GlobalGridDiv showNav={showNav}>{children}</GlobalGridDiv>
}

export default LayoutGrid
