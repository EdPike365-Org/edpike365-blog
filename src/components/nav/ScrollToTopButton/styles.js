import { css, keyframes } from "@emotion/react"

// TODO button causes cursor to change even in area just below button
// but same is not true when using div, which behaves as expected

// NOTE min width guidelines touchable buttons is between 42 and 48px
// good article https://ishadeed.com/article/styling-the-good-old-button/
export const buttonDivCSS = css`
  position: fixed;
  z-index: 998;

  margin: 0px;
  padding: 0px;

  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;

  & svg {
    height: 100%;
    width: 100%;
  }

  cursor: pointer;
  color: var(--color-info-main);
  background-color: transparent;
  background-repeat: no-repeat;

  /* ---- DEFAULT (tiny): Small Narrow Phones (280 x 653) ---- */
  right: 25px;
  bottom: 9px;

  /* ---- Normal Phones (320 x ) ---- */
  @media only screen and (min-width: 320px) {
    right: 35px;
    bottom: 13px;
  }

  /* ---- Larger Phones (540 x ) ---- */
  @media only screen and (min-width: 540px) {
    right: 60px;
    bottom: 20px;
  }

  /* ---- Tablet (700 x ) ---- */
  @media only screen and (min-width: 700px) {
  }

  @media only screen and (min-width: 1024px) {
  }

  /* ---- LapTop (1366 x ) ---- */
  /* Left nav will always be open (handled by nav component) */
  @media only screen and (min-width: 1366px) {
  }
`

const bouncing = keyframes`
  from {
      transform: translateY(2px);
  }
  to {
      transform: translateY(-1px);
  }
`

export const upIconCSS = css`
  margin-top: 0px;
  animation: ${bouncing} 0.5s alternate ease infinite;
`
