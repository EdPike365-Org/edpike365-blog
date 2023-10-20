import React from 'react'
import { css } from "@emotion/react"
import ModalOverlay from "./ModalOverlay.js"
import { CirclesWithBar as Spinner } from 'react-loader-spinner'

const LoaderSpinner = (props) => {
    return (
        <ModalOverlay>
            <div css={outerDivCSS}>
            <Spinner color = "rgb(121, 134, 203)" width="275" height="350" ariaLabel={props.message} />
                <span css={messageCSS} >{props.message}</span>
            </div>
        </ModalOverlay>
    )
};

export default LoaderSpinner

const outerDivCSS = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const messageCSS = css`
    color: #fff;
    font-size: 2.5rem;
    margins: 0;
    text-align: center;
`



