import React from "react"
import { keyframes, css } from "@emotion/react"
import LogoIconLink from "./LogoIconLink"
import LogoIcon from "../../../../icons/LogoIcon"

const SpinAnimation = keyframes`
  0% {

  }
  100% {
    -ms-transform: rotateY(359deg); /* IE 9 */
    -webkit-transform: rotateY(359deg); /* Chrome, Safari, Opera */
    transform: rotateY(359deg) rotate(359deg);
  }
`
const InfiniteSpin = css`
  transition-property: none;
  -webkit-animation-timing-function: linear;
  -moz-animation-timing-function: linear;
  -o-animation-timing-function: linear;
  animation-timing-function: linear;
  animation: ${SpinAnimation} 2s infinite 0s;
`

export const logoIconDivCSS = css`
  box-sizing: border-box;

  vertical-align: middle;

  /* Make color transitions smooth */
  & > svg {
    transition: fill 400ms ease-in-out, stroke 400ms ease-in-out;
  }

  &:hover {
    ${InfiniteSpin}
  }

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  /* No Logo Icon visible */
  display: none;

  /* ---- Normal Phones: Show Logo (320 x ) ---- */
  /* Display the LogoIcon */
  @media only screen and (min-width: 320px) {
    box-sizing: border-box;
    display: inline;
    align-items: center;
    padding: 0px 1px 0px 1px;
    margin: 0px;
    height: 100%;
  }

  /* ---- Larger Phones (540 x ) ---- */
  @media only screen and (min-width: 540px) {
  }

  /* ---- Tablet (700 x ) ---- */
  /* Tablet header height : 64px */
  @media only screen and (min-width: 700px) {
    /* height: 58px; */
    width: 58px;
  }

  /* ---- LapTop (1366 x ) ---- */
  @media only screen and (min-width: 1366px) {
  }
`

const LogoIconDiv = () => {
  return (
    <LogoIconLink>
      <div id="logoIconDiv" css={logoIconDivCSS}>
        <LogoIcon />
      </div>
    </LogoIconLink>
  )
}

export default LogoIconDiv
