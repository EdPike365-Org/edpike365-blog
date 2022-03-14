import React from "react"
import styled from "@emotion/styled"

/* By default we are in Mobile mode, nav is hidden */
/* Should look OK at 280 wide, good at 320 */
const GlobalGridDiv = styled.div`
  /* 
    height: 100vh is necessary to establish a location for header on page load, 
    so it will be sticky and not scroll with the page 
  */
  height: 100vh;
  overflow-y: hidden;

  display: grid;
  gap: 0px;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  /* Tiny Header height: 32px */
  /* No logo icon, just text */
  /* Put all in a single column, 3 rows. Nav is 0 height unless open. */

  grid-template-columns: 1fr;
  grid-template-rows: var(--header-height-tiny) auto 1fr;
  grid-template-areas:
    "header"
    "nav"
    "main";

  /* ---- Normal Phones (320 x ) ---- */
  /* Moble/Normal phone header height: 48px */
  /* Header component will show Logo icon */
  @media only screen and (min-width: 320px) {
    grid-template-rows: var(--header-height-mobile) auto 1fr;
  }

  /* ---- Larger Phones (540 x ) ---- */
  @media only screen and (min-width: 540px) {
  }

  /* ---- Tablet (700 x ) ---- */
  /* Header row gets taller, 64px */
  @media only screen and (min-width: 700px) {
    grid-template-columns: auto 1fr;
    grid-template-rows: var(--header-height-tablet) 1fr;
    grid-template-areas:
      "header header"
      "nav main";
  }

  /* ---- LapTop (1366 x ) ---- */
  /* Left nav will always be open (handled by nav component) */
  @media only screen and (min-width: 1366px) {
  }
`

const LayoutGrid = ({ children }) => {
  return <GlobalGridDiv>{children}</GlobalGridDiv>
}

export default LayoutGrid
