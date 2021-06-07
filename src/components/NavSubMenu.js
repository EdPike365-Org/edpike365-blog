import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"

export const NavSubMenu = ({ title, uuid, children }) => {
    const [isActive, setIsActive] = useState(false)
  
    useEffect(() => {
      // loaded as string, convert to bool
      const statusStr = sessionStorage.getItem(uuid) || "false"
      setIsActive(statusStr.toLowerCase() === "true")
    }, [uuid])
  
    useEffect(() => {
      // setItem auto converts isActive to string
      sessionStorage.setItem(uuid, isActive)
    }, [uuid, isActive])
  
    const SubMenu = styled.ul`
      list-style-type: none;
      color: var(--color-primary-dark);
      letter-spacing: var(--font-letter-spacing-overline);
      padding: 0.5rem 1rem;
    `
    const SubMenuButton = styled.button`
    display: flex;
    border: none;
      background-color: var(--color-background-paper);
      width: 100%;
      padding: 0px;
      margin: 0px;
 
      color: var(--color-primary-dark);
      letter-spacing: var(--font-letter-spacing-overline);
      cursor: pointer;
    `
    //display: ${ isActive ? "flex" : "none" };
    const SubMenuLinks = styled.div`
      display: flex;
      flex-direction: column;
      ${ isActive ? "display: flex;" : "display: none;" }

      /* TODO: animate descent */
      /*
      transition: all 1.0s ease;
      postion: relative;
      transform-origin: top;
      -ms-transform: scale(1,.5);
      -webkit-transform: scale(1,.5); 
      transform: scale(1,.5);
      */
    `

    const toggleActive = () => {
      setIsActive(!isActive)
    }
  
    return (
      <SubMenu>
        <SubMenuButton onClick={toggleActive} role="menu">
          <span>{title}</span>
          <span>{isActive ? "  -" : "  +"}</span>
        </SubMenuButton>
        <SubMenuLinks role="menuitems" >{children}</SubMenuLinks>
      </SubMenu>
    )
  }
  
  