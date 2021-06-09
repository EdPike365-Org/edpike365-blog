import React from "react"
import styled from "@emotion/styled"

const StyledSection = styled.section`
  padding: 10px;
  margin: 0rem;
  background-color: var(--color-background-paper);
  border-radius: var(--shape-border-radius);
  border: var(--shape-border);
  box-shadow: var(--shape-box-shadow);
  color: var(--color-text-primary);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
`
const Title = styled.h3`
    margin-top: 0px;
    margin-bottom: .4rem;
`

const Section = ({ title , children}) => {

    return (
      <StyledSection>
        <Title>
           <span itemProp="headline">{title}</span>
        </Title>
        { children }
      </StyledSection>
  )
}

export default Section
