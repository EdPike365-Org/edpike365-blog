import React, { useContext } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { SHGStyleContext } from "../contexts/SHGContext"
//import { themeOptions, getThemeObject } from "../styles/themes"

export const StyleSummary = () => {
  const { SHGModel } = useContext(SHGStyleContext)
  const model = SHGModel.model
  const styles = ((typeof window === "undefined")? [] : model.styles )
  return (
    <div>
      <h5
        css={css`
          margin-bottom: 0.25rem;
        `}
      >
        SHG Style Model State
      </h5>
      <ul
        css={css`
          margin-top: 0.25rem;
        `}
      >
        <li>idPrefix = ({model.idPrefix}).</li>
        <li>
          Styles ({ styles.length})
          <table>
              <thead><th>Display Name</th><th>Uses</th><th>Enabled</th><th>FileName</th></thead>
            {Array.from(styles).map(style => (
              <tr>
                <td>{style.dataset.displayname}</td>
                <td>{style.dataset.use}</td>
                <td>{ style.disabled ? "no" : "yes" }</td>
                <td>{style.dataset.filename}</td>
              </tr>
            ))}
          </table>
        </li>
      </ul>
    </div>
  )
}

export const StyleSelector = () => {
  const { SHGModel } = useContext(SHGStyleContext)
  const model = SHGModel.model

  function handleChange(e) {
    if(typeof window !== "undefined"){
      console.log("StyleSelector: handleChange, value = " + e.target.value)
      model.setSHGStyleByID(e.target.value)
    }
  }

  let selectedStyleID = ""
  let lastEnabledStyle = null
  if (typeof window !== "undefined"){ lastEnabledStyle = model.getLastEnabledOptionalStyle() }
  
  if (lastEnabledStyle) selectedStyleID = lastEnabledStyle.id
  console.log(
    "!!!!!!!!! select style: calced selectedStyleID " + selectedStyleID
  )

  const styleOptions = []
  // this node array is not iterable, has to be converted to normal array
  let styleArray = []
  if (typeof window !== "undefined"){ styleArray = Array.from(model.getOptionalStyles())}
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

  return (
    <select onChange={handleChange} value={selectedStyleID}>
      {styleOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export const DarkModeToggle = () => {
  const { SHGModel } = useContext(SHGStyleContext)
  const model = SHGModel.model

  const Button = styled.button`
    font-size: 1.6rem;
    font-weight: bold;
    width: 3rem;
    padding: 0rem;
    border: none;
    cursor: pointer;
    color: var(--color-text-secondary);
    background-color: var(--color-background-paper);
    white-space: pre-wrap;
  `
  const isDark = () => {
    return ( (typeof window === "undefined") ? false : model.isUsingADarkStyle());
  }

  const handleClick = () => {
    (typeof window === "undefined") ? null: model.toggleDarkStyle();
  }

  return (
    <>
      <Button onClick={handleClick}>{isDark() ? "☼ " : "☽ "}</Button>
    </>
  )
}
