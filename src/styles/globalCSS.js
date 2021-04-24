import { css } from "@emotion/react"
import { normalize } from '../styles/normalize.js'

export const globalCSS = css`
    body.light-mode {
        background-color: grey;
        color: #333;
        transition: background-color 0.3s ease;
    }
    body.dark-mode {
        background-color: black;
        color: #999;
    }
`