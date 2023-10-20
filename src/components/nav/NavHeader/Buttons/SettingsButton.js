import React from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/react"
import commonButtonCSS from "./buttonCSS"
import SliderIcon from "../../../../icons/SliderIcon"

const settingsButtonCSS = css`
  &:hover {
    transform: translateX(-1px) translateY(-1px);
  }
`

//Note: if button has no dimensions, or no text, icons wont render
const SettingsButton = (props) => {
  const handleClick = () => {
    navigate(props.target)
  }

  return (
    <button
      id="settingsButton"
      css={[commonButtonCSS, settingsButtonCSS]}
      aria-label={"Navigation"}
      onClick={handleClick}
    >
      <SliderIcon />
    </button>
  )
}

export default SettingsButton
