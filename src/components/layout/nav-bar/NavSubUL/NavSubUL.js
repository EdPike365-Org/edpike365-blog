import React from "react"

/* top level category: should only head a list of NavLI children */
/* SubUL is always static, the expandable NavBarSubMenu looks the same but the button has its own css */
const SubUL = (props) => {

  return (
    <ul
      style={{
        listStyleType: "none",
        letterSpacing: "var(--font-letter-spacing-overline)",
        padding: "0.5rem 1rem",
        transition: "color 400ms ease-in-out, background-color 400ms ease-in-out",
      }}
    >
      {props.children}
    </ul>
  )
}

export default SubUL