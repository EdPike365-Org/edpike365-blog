import React, { useContext } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { SHGStyleContext } from "../contexts/SHG_Context"
import MoonIconSolid from "../icons/MoonIconSolid"
import SunIconSolid from "../icons/SunIconSolid"

export const isSSR = () => {
  return typeof window === "undefined"
}

export const StyleSummary = () => {
  const { SHGModel } = useContext(SHGStyleContext)
  const model = SHGModel.model
  const styles = isSSR() ? [] : model.styles
  return (
    <div>
      <h5
        css={css`
          margin-bottom: 0.25rem;
        `}
      >
        SHG Style Model State
      </h5>
      idPrefix: "{model.idPrefix}".
      <br />
      Styles: {styles.length}
      <table>
        <thead>
          <tr>
            <th>Display Name</th>
            <th>Uses</th>
            <th>Enabled</th>
            <th>FileName</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(styles).map(style => (
            <tr key={style.dataset.filename}>
              <td>{style.dataset.displayname}</td>
              <td>{style.dataset.use}</td>
              <td>{style.disabled ? "no" : "yes"}</td>
              <td>{style.dataset.filename}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const StyleSelector = () => {
  const { SHGModel } = useContext(SHGStyleContext)
  const model = SHGModel.model

  function handleChange(e) {
    if (!isSSR()) {
      model.setSHGStyleByID(e.target.value)
    }
  }

  function getSelectedStyleID(){
    let lastEnabledStyle = null
    console.log("getsSelectedStyleID()...")
    if (!isSSR()) {
      console.log("!isSSR() so getting style from model..")
      lastEnabledStyle = model.getLastEnabledOptionalStyle()
    }

    let selectedStyleID = ""
    if (lastEnabledStyle) selectedStyleID = lastEnabledStyle.id
    
    console.log("SHG_Components: selectedStyleID = " + selectedStyleID)
    return selectedStyleID;
  }

  const selectedStyleID = getSelectedStyleID()

  const styleOptions = []
  let styleArray = []
  // this node array is not iterable, has to be converted to normal array
  if (!isSSR()) {
    styleArray = Array.from(model.getOptionalStyles())
  }
  for (var i = 0; i < styleArray.length; i++) {
    const styleEl = styleArray[i]
    const thisOption = {
      key: styleEl.dataset.key,
      label: styleEl.dataset.displayname,
      value: styleEl.id,
    }
    if (styleEl.id === selectedStyleID) {
      thisOption.selected = "selected"
    }

    styleOptions.push(thisOption)
  }

  /*
        {styleOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    */
  const options = styleOptions.map( option => {
    return <option key={option.value} value={option.value} selected={option.selected}>{option.label}</option>;
  })

  //    <select onChange={handleChange} value={selectedStyleID} >
  return (
    <select onChange={handleChange} >
      {options}
    </select>
  )
}

export const DarkModeToggle = ({hide}) => {
  const { SHGModel } = useContext(SHGStyleContext)
  const model = SHGModel.model

  const Button = styled.button`
    display: ${props =>
    props.hide ? 'none' : 'inline-flex'};
    align-items: center;
    justify-content: center;

    padding: .25rem;
    margin: 0rem;
    width: 2.8rem;
    height: 2.8rem;

    border: none;
    cursor: pointer;
    background-color: var(--color-background-paper);

    color: var(--color-text-secondary);
    white-space: pre-wrap;
  `

  const isDark = () => {
    if (isSSR()){
      return false
    }else{
      return model.isUsingADarkStyle()
    }
  }

  const shouldNotDisplayYet = () => {
    const res = (isSSR() || model === null)
    console.log("SHG_Components: shouldNotRenderYet() was " + res)
    return res
  }

  const handleClick = () => {
    if (!isSSR()) model.toggleDarkStyle()
  }
  
  //  { isDark() ? "☼ " : "☽ "}
  let iconToRender;
  if(shouldNotDisplayYet()){
    console.log("SHG_Components: shouldNotRenderYet() was true, iconToRender is being set to null")
    iconToRender = null
  }else{
    if(isDark()){
      iconToRender = <SunIconSolid/>;
    }else{
      iconToRender = <MoonIconSolid/>;
    }
  } 

  return (
    <Button onClick={handleClick} hide={hide} >
      {iconToRender}
    </Button>
  )
}

export const PrefersDarkMode = () => {
  const { SHGModel } = useContext(SHGStyleContext)
  const model = SHGModel.model

  return (
    <span>
      Prefers Dark Mode ={" "}
      {!isSSR() && model.darkQuery.matches ? "true" : "false"}.
    </span>
  )
}
