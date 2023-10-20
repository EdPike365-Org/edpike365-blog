import React from 'react'
import { css } from "@emotion/react"

//onKeyDown={this.handleClick} is to prevent a11y: warning  Visible, non-interactive elements with click handlers must have at least one keyboard listener  jsx-a11y/click-events-have-key-events
//role="presentation" is to prevent a11y: warning  Avoid non-native interactive elements. If using native HTML is not possible, add an appropriate role and support for tabbing, mouse, keyboard, and touch inputs to an interactive content element  jsx-a11y/no-static-element-interactions
const handleClick = (event) => {
    event.stopPropagation();
}

const ModalOverlay = ({children}) => {
    return (
        <div css={modalDivCSS} onClick={handleClick} onKeyDown={handleClick} role="presentation">
            {children}
        </div>
    )
};

export default ModalOverlay

const modalDivCSS = css`

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 100000;
    background-color: rgba(1,1,1,0.85);

`