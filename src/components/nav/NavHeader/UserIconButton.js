import React from "react"
import {navigate} from "gatsby"
import styled from "@emotion/styled"
import UserIcon from "../../../icons/UserIcon"

export const UserButton = styled.button`
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
const UserIconButton = () => {

  const handleClick = () => {
    navigate( "/settings/")
  }

  return (
    <UserButton aria-label={"Navigation"} onClick={handleClick} >
      <UserIcon/>
    </UserButton>
  )
}

export default UserIconButton
