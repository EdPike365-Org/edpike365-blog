import React from "react"
import styled from "@emotion/styled"
import LogoIcon from "../icons/LogoIcon"

export const LogoIconDiv = styled.div`
  padding: 0rem;
  vertical-align: middle;

  /* 
  At smallest size, which is our default, Icon is invisible.
  Let the parent component set visibility and dimension change
  because we may have another instance of this widget on the site.
  */
  padding: 5px;
  margin: 5px 5px;
  width: 35px;
  height: 35px;

  & > svg {
    transition: transform 0.2s ease-out;
  }

  & > svg:hover {
    -ms-transform: rotate(180deg); /* IE 9 */
    -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
    transform: rotate(180deg);
  }

`

const Logo = () => {
  return (
    <LogoIconDiv>
      <LogoIcon />
    </LogoIconDiv>
  )
}

export default Logo
