import React from "react"
import styled from "@emotion/styled"
import UserIcon from "../icons/UserIcon"

export const UserButt = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  padding: .25rem;
  margin: 0rem;
  /* need to pad to the widest icon to prevent resize */
  width: 2.8rem;
  height: 2.8rem;
  
  border: none;
  letter-spacing: 0px;
  cursor: pointer;
  background-color: var(--color-background-paper);

`
//Note: if button has no dimensions, or no text, icons wont render
const UserButton = () => {

  return (
    <UserButt aria-label={"Navigation"}>
      <UserIcon/>
    </UserButt>
  )
}

export default UserButton
