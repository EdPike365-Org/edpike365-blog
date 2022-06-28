import React, { useContext } from "react"
import { NavContext } from "../../../../contexts/NavContext"
import { css, keyframes } from "@emotion/react"
import LogoIconDiv from "./LogoIconDiv"
import LogoTextDiv from "./LogoTextDiv"

const flipLogoLeftKeyframes = keyframes`
  0% {
    -ms-transform: translateX(30vw); /* IE 9 */
    -webkit-transform: translateX(30vw); /* Chrome, Safari, Opera */
    transform: translateX(30vw);
  }
  1% {
    -ms-transform: translateX(30vw) rotate(0deg);
    -webkit-transform: translateX(30vw) rotate(0deg);
    transform: translateX(30vw) rotate(0deg);
  }
  100% {
    -ms-transform: translateX(0.1vw) rotate(360deg);
    -webkit-transform: translateX(0.1vw) rotate(360deg);
    transform: translateX(0.1vw) rotate(360deg);
  }
`

const flipLogoLeftAnimation = css`
  animation: ${flipLogoLeftKeyframes} 1s ease-out;
`

/*eslint-disable */
const slideLogoLeftKeyframes = keyframes`
  0% {
    -ms-transform: translateX(30vw); /* IE 9 */
    -webkit-transform: translateX(30vw); /* Chrome, Safari, Opera */
    transform: translateX(30vw);
  }
  1% {
    -ms-transform: translateX(30vw); /* IE 9 */
    -webkit-transform: translateX(30vw); /* Chrome, Safari, Opera */
    transform: translateX(30vw);
  }
  100% {
    transform: translateX(0.1vw);
  }

`
/*eslint-enable */

const logoDivCSS = runLogoAnim => css`
  box-sizing: border-box;

  /* Height controled by NavHeader */
  height: 100%;
  padding: 1px 0px;
  margins: 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-primary-main);
  text-decoration: none;

  /* ---- LapTop (1366 x ) ---- */
  @media only screen and (min-width: 1366px) {
    ${runLogoAnim ? flipLogoLeftAnimation : ""}
  }
`

const LogoDiv = () => {
  const { runLogoAnimState } = useContext(NavContext)
  const [runLogoAnim] = runLogoAnimState

  return (
    <div css={logoDivCSS(runLogoAnim)}>
      <LogoIconDiv />
      <LogoTextDiv />
    </div>
  )
}

export default LogoDiv
