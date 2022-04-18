import { css } from "@emotion/react"

/* shared by nav buttons, can be extended in the button component */
const commonButtonCSS = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 10px;
  margin: 0px 0px 0px 0px;
  height: 100%;
  aspect-ratio: 1 / 1;

  border: none;
  letter-spacing: 0px;
  cursor: pointer;
  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
`

export default commonButtonCSS
