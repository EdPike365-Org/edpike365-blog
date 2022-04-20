import React from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/react"
import commonButtonCSS from "./buttonCSS"
import UserIcon from "../../../../icons/UserIcon"

const userButtonCSS = css``
//Note: if button has no dimensions, or no text, icons wont render
const UserButton = () => {
  const handleClick = () => {
    navigate("/account")
  }

  return (
    <button
      id="userButton"
      css={[commonButtonCSS, userButtonCSS]}
      aria-label={"Navigation"}
      onClick={handleClick}
    >
      <UserIcon />
    </button>
  )
}

export default UserButton
