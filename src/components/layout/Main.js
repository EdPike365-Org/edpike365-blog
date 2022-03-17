import React from "react"
import styled from "@emotion/styled"
import Footer from "./Footer"

// TODO: add a footer with copyright, etc. links

export const StyledMain = styled.main`
  grid-area: main;

  overflow: auto;

  background-color: var(--color-background-default);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  width: 100%;
  min-width: 275px;
  /* 
    If you have top or bottom padding, the navbar will resrve space for it 
    and a little scroll bar will appear under teh navbar no matter how
    big the navbar gets.
  */
  padding: 0px 30px 0px 30px;

  /* ---- Normal Phones (320 x ) ---- */
  @media only screen and (min-width: 320px) {
    padding: 0px 30px 0px 30px;
  }

  /* ---- Larger Phones (540 x ) ---- */
  @media only screen and (min-width: 540px) {
    padding: 0px 30px 0px 30px;
  }
`
const Main = ({ children }) => {
  return (
    <StyledMain>
      {children}
      <br />
      <Footer />
    </StyledMain>
  )
}

export default Main
