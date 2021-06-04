import React from "react"
import styled from "@emotion/styled"

const Container = styled.div`
  padding: 10px;
  margin: 0.5rem;
  background-color: var(--color-background-paper);
  border-radius: var(--shape-border-radius);
  border: var(--shape-border);
  box-shadow: var(--shape-box-shadow);
  color: var(--color-text-primary);
`
const Title = styled.h3`
    margin-top: 0px;
    margin-bottom: 0px;

  & > a:link {
    text-decoration: none;
  }

  & > a:hover {
    background-color: var(--palette-action-hover);
  }
`

const Content = ({ title , children}) => {

    return (
      <Container>
        <Title>
           <span itemProp="headline">{title}</span>
        </Title>
        { children }
      </Container>
  )
}

export default Content
