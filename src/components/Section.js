import React from "react"
import styled from "@emotion/styled"

const StyledSection = styled.section`
  color: var(--color-text-secondary);
  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  padding: 10px;
  border-radius: var(--shape-border-radius);
  border: var(--shape-border);
  box-shadow: var(--shape-box-shadow);
`
const Title = styled.h3`

`

const Section = ({ title , children}) => {

    return (
      <StyledSection>
        <Title itemProp="headline">
           {title}
        </Title>
        { children }
      </StyledSection>
  )
}

export default Section
