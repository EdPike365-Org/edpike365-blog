import React from "react"
import styled from "@emotion/styled"

/* By default we are in Mobile mode, nav is hidden */
/* Should look OK at 280 wide, good at 320 */
const GlobalGridDiv = styled.div`
  /* height vh is necessary to establish a location for header and footer on page load, 
      so they can be sticky 
  */
  height: 100vh;

  overflow-y: hidden;

  display: grid;
  gap: 0px;
  grid-template-columns: auto;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "header"
    "nav"
    "main";

  /*-------------------- Tablet  --------------------*/
  /* Header is going to get taller */
  /* TODO: add icon only left nav */
  @media only screen and (min-width: 700px) {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "header header"
      "nav main";
  }

  /*-------------------- LapTop  --------------------*/
  /* Show nav open on left, hide hamburger */
  @media only screen and (min-width: 1366px) {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "header header"
      "nav main";
  }
`

const LayoutGrid = ({ children }) => {
  return <GlobalGridDiv>{children}</GlobalGridDiv>
}

export default LayoutGrid
