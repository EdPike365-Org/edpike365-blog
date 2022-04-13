import React from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/react"
import UserIcon from "../../../../icons/UserIcon"

const userButtonCSS = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
  margin: 0px 5px 0px 0px;
  height: 100%;
  aspect-ratio: 1 / 1;

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
      css={userButtonCSS}
      aria-label={"Navigation"}
      onClick={handleClick}
    >
      <UserIcon />
    </button>
  )
}

export default UserButton
