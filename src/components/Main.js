import React from "react"
import styled from "@emotion/styled"

export const StyledMain = styled.main`
  grid-area: content;

  background-color: var(--color-background-default);
  padding: .25rem;

  /* this is a mobile first UI 
    We will have a navbar on the footer in the future.
    So we need the footer to be floating at bottom, but only in mobile mode.
    On mobile, there is only 1 grid column, so will only be one scroll bar no matter how long content in main.
    But on bigger screens we have fixed nav adn long content makes a second outer scroll bar show up.
    Overflow auto keeps the footer from being pushed off. 
  */
  overflow: auto; 
  
`
const Main = ({ children }) => {
  return <StyledMain>{children}</StyledMain>
}

export default Main
