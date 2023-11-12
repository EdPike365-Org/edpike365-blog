import React from "react"
import { navigate } from "gatsby"
import * as styles from "../Buttons.module.css"
import SliderIcon from "../../../../../../icons/SliderIcon"

//Note: if button has no dimensions, or no text, icons wont render
const SettingsButton = (props) => {
  const handleClick = () => {
    navigate(props.target)
  }

  return (
    <button
      id="settingsButton"
      className={`${styles.commonButtonCSS} ${styles.settingsButtonCSS} settings-button`}
      aria-label={"Site Settings"}
      title="Site Settings"
      onClick={handleClick}
    >
      <SliderIcon />
    </button>
  )
}

export default SettingsButton
