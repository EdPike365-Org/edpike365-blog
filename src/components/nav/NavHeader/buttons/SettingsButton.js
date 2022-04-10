import React from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/react"
import SliderIcon from "../../../../icons/SliderIcon"
/*
display: inline-flex;
align-items: stretch;
justify-content: center;
aspect-ratio: 1 / 1;
*/

const buttonCSS = css`
  display: inline-flex;
  align-items: stretch;
  justify-content: center;

  padding: 5px;
  margin: 0px 3px 0px 0px;

  height: 100%;

  border: none;
  letter-spacing: 0px;
  cursor: pointer;
  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
`
//Note: if button has no dimensions, or no text, icons wont render
const SettingsButton = () => {
  const handleClick = () => {
    navigate("/settings/")
  }

  return (
    <button
      id="settingsButton"
      css={buttonCSS}
      aria-label={"Navigation"}
      onClick={handleClick}
    >
      <SliderIcon />
    </button>
  )
}

export default SettingsButton
