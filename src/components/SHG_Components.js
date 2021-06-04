import React, { useContext } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { SHGStyleContext } from "../contexts/SHGContext"
import MoonIconSolid from "./MoonIconSolid"
import SunIconSolid from "./SunIconSolid"

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

  let selectedStyleID = ""
  let lastEnabledStyle = null
  if (!isSSR()) {
    lastEnabledStyle = model.getLastEnabledOptionalStyle()
  }

  if (lastEnabledStyle) selectedStyleID = lastEnabledStyle.id

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
    display: inline-flex;
    align-items: center;
    justify-items: center;

    padding: 0rem;
    margin: 0rem 0.5rem;
    width: 1.4rem; /* need to pad to the widest icon to prevent resize */

    border: none;
    cursor: pointer;
    background-color: var(--color-background-paper);

    color: var(--color-text-secondary);
    white-space: pre-wrap;
  `

  const isDark = () => {
    return isSSR() ? false : model.isUsingADarkStyle()
  }

  const shouldNotDisplayYet = () => {
    return isSSR() || model === null
  }

  const handleClick = () => {
    if (!isSSR()) model.toggleDarkStyle()
  }
  //  { isDark() ? "☼ " : "☽ "}
  return (
    <Button
      onClick={handleClick}
      display={shouldNotDisplayYet() ? "none" : "inline-block"}
    >
      {isDark() ? <SunIconSolid /> : <MoonIconSolid />}
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
