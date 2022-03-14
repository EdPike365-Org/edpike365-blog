import React from "react"
import styled from "@emotion/styled"

//https://css-tricks.com/best-way-implement-wrapper-css/
const WrapperDiv = styled.div`
  max-width: 1600px;
  margin: 0px auto;
  padding: 0px;
`

const Wrapper = ({ children }) => {
  return <WrapperDiv>{children}</WrapperDiv>
}

export default Wrapper
