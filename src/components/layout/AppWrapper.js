import React from "react"
import styled from "@emotion/styled"
import Helmet from "react-helmet"

//https://css-tricks.com/best-way-implement-wrapper-css/
const WrapperDiv = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0px;
  border-left: var(--shape-border);
  border-right: var(--shape-border);
  box-shadow: var(--shape-box-shadow);
`

/*
      <Helmet>
        <link  
        rel="preload" 
        as="style" 
        type="text/css" 
        href="/src/styles/burger.css" 
        data-hsb-managed="true"
        data-hsb-key="hsb_1234"
        data-hsb-displayname="Burger King"
        data-hsb-always-enabled="false"
        data-hsb-uses=""
        />
      </Helmet>
    */
const Wrapper = ({ children }) => {
  return(
    <WrapperDiv>

    {children}
    </WrapperDiv>
  )
}

export default Wrapper
