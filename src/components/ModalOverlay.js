import React from 'react'
import { css } from "@emotion/react"

const ModalOverlay = ({children}) => {
    return (
        <div css={modalDivCSS} onClick={event => event.stopPropagation()} >
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