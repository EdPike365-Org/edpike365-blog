import { css, keyframes } from "@emotion/react"

// we position from right because I *think* that it
// better handles the scroll bar offset
export const buttonDivCSS = css`
  width: 40px;
  height: 40px;

  position: fixed;
  right: 30px;
  bottom: 20px;

  font-size: 3rem;
  z-index: 9999;
  cursor: pointer;
  color: var(--color-info-main);

  /* ---- Normal Phones (320 x ) ---- */
  @media only screen and (min-width: 320px) {
    right: 40px;
    bottom: 25px;
  }

  /* ---- Larger Phones (540 x ) ---- */
  @media only screen and (min-width: 540px) {
    right: 60px;
    bottom: 35px;
  }

  /* ---- Tablet (700 x ) ---- */
  @media only screen and (min-width: 700px) {
    right: 60px;
    bottom: 35px;
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
  margin-top: 10px;
  animation: ${bouncing} 0.5s alternate ease infinite;
`
