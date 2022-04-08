import styled from "@emotion/styled"
import { LogoTextSpan } from "./LogoText"

export const LogoDiv = styled.div`
  /* Height controled by Header */
  height: 100%;

  padding: 0rem;
  margins: 0rem;
  display: flex;
  align-items: center;
  justify-content: center;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  /* No Logo Icon visible */
  & > #logoIconDiv {
    display: none;
  }

  /* ---- Normal Phones: Show Logo (320 x ) ---- */
  /* Display the LogoIcon */
  @media only screen and (min-width: 320px) {
    /* height: var(--header-height-mobile); */

    & > #logoIconDiv {
      display: inline;
      height: 48px;
      width: 48px;
    }
    & > ${LogoTextSpan} {
      font-size: 36px;
      letter-spacing: 0.1em;
    }
  }

  /* ---- Larger Phones (540 x ) ---- */
  /* The logo text can spread out some more, more letter spacing */
  @media only screen and (min-width: 540px) {
    & > #logoIconDiv {
      display: inline;
      height: 48px;
      width: 48px;
    }
    & > ${LogoTextSpan} {
      font-size: 36px;
      margin-left: 0.15em;
      letter-spacing: 0.15em;
    }
  }

  /* ---- Tablet (700 x ) ---- */
  /* Tablet header height : 64px */
  @media only screen and (min-width: 700px) {
    /* height: var(--header-height-tablet); */

    & > #logoIconDiv {
      display: inline;
      height: 58px;
      width: 58px;
    }
    & > ${LogoTextSpan} {
      font-size: 48px;
      margin-left: 0.2em;
      letter-spacing: 0.2em;
    }
  }

  /* Key frames defined here because used below in Large Desktop */
  @keyframes SLIDE-LOGO-LEFT {
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
  }

  @keyframes FLIP-LOGO-LEFT {
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
  }

  /* ---- LapTop (1366 x ) ---- */
  @media only screen and (min-width: 1366px) {
    ${props =>
      props.runLogoAnim ? "animation: FLIP-LOGO-LEFT 1s ease-out;" : ""}

    & > #logoCionDiv {
      width: var(--header-height-tablet);
      height: var(--header-height-tablet);
      padding-left: 10px;
    }

    & > ${LogoTextSpan} {
      font-size: 48px;
      margin-left: 0.1em;
      letter-spacing: 0.25em;
    }
  }
`
/*
export const SlideLogoDivLeft = keyframes`
  0% {
    margin-left: 35%;
    -ms-transform: rotate(180deg); 
    -webkit-transform: rotate(180deg); 
    transform: rotate(180deg);
    transition: transform 0.2s ease-out;
  }
  100% {
    margin-left: 0px;
  }
`
*/
