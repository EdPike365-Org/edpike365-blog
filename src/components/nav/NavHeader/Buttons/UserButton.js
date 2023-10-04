import React from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/react"
import commonButtonCSS from "./buttonCSS"
import UserIcon from "../../../../icons/UserIcon"
import { useAuth0 } from '@auth0/auth0-react';

const userButtonCSS = css`
  img {
    border-radius: 50%;
  }  
  &:hover {
    transform: translateX(-1px) translateY(-1px);
  }
`

//Note: if button has no dimensions, or no text, icons wont render
const UserButton = () => {

  const { user } = useAuth0();
  const { name, picture, email } = user;

  const handleClick = () => {
    navigate("/account")
  }

  function UserImage() {
    if (picture) {
      return(
        <img
        src={picture}
        alt="Profile Picture"
       />
      ) 
    }else{
      return(
        <UserIcon />
      )
    }

  }

  return (
    <button
      id="userButton"
      css={[commonButtonCSS, userButtonCSS]}
      aria-label={"User Account Button"}
      onClick={handleClick}
    >
      <UserImage />
    </button>
  )
}

export default UserButton
