import React from "react"
import { HSBStyleContextProvider } from "./contexts/HSB_Context"
/*
//How to use with another wrapper
import { NavContextWrapper } from "./src/contexts/NavContext"
export const wrapRootElement = props => {
  return (
    <HSBStyleContextProvider>
      <NavContextWrapper {...props} />
    </HSBStyleContextProvider>
  )
}
*/
/*
export const wrapRootElement = ({children}) => {
  return (
    <HSBStyleContextProvider>
      {children}
    </HSBStyleContextProvider>
  )
}
*/
export const wrapRootElement = ({ element }) => {
  return (
    <HSBStyleContextProvider >{element}</HSBStyleContextProvider >
  )
}

