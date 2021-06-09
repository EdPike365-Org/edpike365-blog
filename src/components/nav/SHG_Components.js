import React, { useContext } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { SHGStyleContext } from "../../contexts/SHG_Context"
import MoonIconSolid from "../../icons/MoonIconSolid"
import SunIconSolid from "../../icons/SunIconSolid"
import { isSSR } from "../../utils/HelperFunctions"

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
 
  function getSelectedStyleID() {
    let styleID = ""
    if (!isSSR()) {
      const lastEnabledStyle = model.getLastEnabledOptionalStyle()
      if (lastEnabledStyle) styleID = lastEnabledStyle.id
    }
    return styleID
  }

  const getStyleOptions = () => {
    const selectedStyleID = getSelectedStyleID()
    // this node array is not iterable, has to be converted to normal array
    let styleArray = Array.from(model.getOptionalStyles())

    const styleOptions = []
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

    return styleOptions
  }

  const getSelectOptions = () => {
    const styleOptions = getStyleOptions()
    //Setting "selected" attribute makes React poop a big red warning, but only in dev
    //However, if I use the recommended approach instead, in PROD, if I reload the page
    //the select draws the original version, which has nothing selected.
    //I tried everything to make it rerender. useState, useEffect. useState would be accurate
    //but the select WOULD NOT RERENDER to reflect the state because technically the state had not changed
    const options = styleOptions.map(option => {
      return (
        <option key={option.value} value={option.value} selected={option.selected}>
          {option.label}
        </option>
      )
    })
    return options
  }

  function handleChange(e) {
    model.setSHGStyleByID(e.target.value)
  }

  let selectOptions = []
  if (!isSSR()) {
    selectOptions = getSelectOptions()
  }

  return (
    <select onChange={handleChange} >
      {selectOptions}
    </select>
  )
}

export const DarkModeButton = styled.button`
  display: ${props => (props.hide ? "none" : "inline-flex")};
  align-items: center;
  justify-content: center;

  padding: 5px;
  margin: 5px 5px;
  width: 30px;
  height: 30px;

  border: none;
  cursor: pointer;

  color: var(--color-text-secondary);
  white-space: pre-wrap;

  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out; 

`

export const DarkModeToggle = ({ hide }) => {
  const { SHGModel } = useContext(SHGStyleContext)
  const model = SHGModel.model

  const isDark = () => {
    if (isSSR()) {
      return false
    } else {
      return model.isUsingADarkStyle()
    }
  }

  const shouldNotDisplayYet = () => {
    const res = isSSR() || model === null
    return res
  }

  const handleClick = () => {
    if (!isSSR()) model.toggleDarkStyle()
  }

  //  { isDark() ? "☼ " : "☽ "}
  let iconToRender
  if (shouldNotDisplayYet()) {
    iconToRender = null
  } else {
    if (isDark()) {
      iconToRender = <SunIconSolid />
    } else {
      iconToRender = <MoonIconSolid />
    }
  }

  return (
    <DarkModeButton onClick={handleClick} hide={hide}>
      {iconToRender}
    </DarkModeButton>
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
