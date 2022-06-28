import React from "react"
import styled from "@emotion/styled"

//https://css-tricks.com/best-way-implement-wrapper-css/
const WrapperDiv = styled.div`
  max-width: var(--app-max-width);
  margin: 0px auto;
  padding: 0px;
`

const Wrapper = ({ children }) => {
  return <WrapperDiv>{children}</WrapperDiv>
}

export default Wrapper
