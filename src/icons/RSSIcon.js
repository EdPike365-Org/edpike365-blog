import React from "react"
import { css } from "@emotion/react"

const RSSIcon = props => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      css={css`
        fill: var(--color-text-secondary);
        stroke: var(--color-text-secondary);
      `}
    >
      <title id="rss-title">RSS Feed</title>
      <path d="M4 11a9 9 0 0 1 9 9"></path>
      <path d="M4 4a16 16 0 0 1 16 16"></path>
      <circle cx="5" cy="19" r="1"></circle>
    </svg>
  )
}

export default RSSIcon
