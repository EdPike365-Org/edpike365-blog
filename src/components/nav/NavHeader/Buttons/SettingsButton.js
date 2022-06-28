import React from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/react"
import commonButtonCSS from "./buttonCSS"
import SliderIcon from "../../../../icons/SliderIcon"

const settingsButtonCSS = css``

//Note: if button has no dimensions, or no text, icons wont render
const SettingsButton = () => {
  const handleClick = () => {
    navigate("/settings/")
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
