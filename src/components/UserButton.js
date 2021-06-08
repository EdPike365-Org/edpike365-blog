import React from "react"
import {navigate} from "gatsby"
import styled from "@emotion/styled"
import UserIcon from "../icons/UserIcon"

export const UserButt = styled.button`
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
  
`
//Note: if button has no dimensions, or no text, icons wont render
const UserButton = () => {

  const handleClick = () => {
    navigate( "/settings/")
  }

  return (
    <UserButt aria-label={"Navigation"} onClick={handleClick} >
      <UserIcon/>
    </UserButt>
  )
}

export default UserButton
