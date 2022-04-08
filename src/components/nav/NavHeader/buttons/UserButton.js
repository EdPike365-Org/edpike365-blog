import React from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/react"
import UserIcon from "../../../../icons/UserIcon"

const buttonCSS = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
  margin: 5px 5px;
  width: 30px;
  height: 30px;

  border: none;
  letter-spacing: 0px;
  cursor: pointer;
  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
`
//Note: if button has no dimensions, or no text, icons wont render
const UserButton = () => {
  const handleClick = () => {
    navigate("/account")
  }

  return (
    <button
      id="userButton"
      css={buttonCSS}
      aria-label={"Navigation"}
      onClick={handleClick}
    >
      <UserIcon />
    </button>
  )
}

export default UserButton
