import React from "react"
import styled from "@emotion/styled"

export const StyledMain = styled.main`
  grid-area: main;

  width: 100%;
  min-width: 279px;
  height: 100%;
  min-height: 100vh;

  overflow: auto;

  background-color: var(--color-background-default);
  padding: 1rem;
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  /*-------------------- Decent Phones  --------------------*/
  @media only screen and (min-width: 320px) {
    padding: 0.5rem;
  }

  /*-------------------- Better Phones  --------------------*/
  @media only screen and (min-width: 360px) {
    padding: 1rem;
  }
`
// The line breaks at bottom are there to handle too short scroll bars on short screens
// TODO fix that
const Main = ({ children }) => {
  return (
    <StyledMain>
      {children}
      <br />
      <br />
      <br />
      <br />
    </StyledMain>
  )
}

export default Main
