import React from "react"
import styled from "@emotion/styled"

//https://css-tricks.com/best-way-implement-wrapper-css/
const WrapperDiv = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0px;
  border-left: var(--shape-border);
  border-right: var(--shape-border);
  box-shadow: var(--shape-box-shadow);
`

const Wrapper = ({ children }) => {
  return(
    <WrapperDiv>
    {children}
    </WrapperDiv>
  )
}

export default Wrapper
