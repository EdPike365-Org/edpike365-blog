import { keyframes, css } from "@emotion/react"

export const Slide = keyframes`
  0% {
    transform-origin: top;
    transform: scaleY(1);
  }
  100% {
    transform-origin: top;
    transform: scaleY(0);
  }
`
const SlideClosed = css`
  animation: ${Slide} 2s;
  display: none;
`

export const navSubMenuUL = css`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
`

export const subMenuActionsDiv = css`
  display: flex;
  flex-direction: row;
  border: none;
  background-color: var(--color-background-paper);
  width: 100%;
  padding: 0px;
  margin: 0px;
`

export const navLink = css`
  letter-spacing: var(--font-letter-spacing-overline);
  cursor: pointer;
  color: var(--color-primary-main);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const activeLinkStyle = {
  color: "var(--color-background-paper)",
  background: "var(--color-primary-main)",
  transition: "color 400ms ease-in-out, background-color 400ms ease-in-out",
}

export const expandButton = css`
  border: none;
  white-space: pre;
  color: var(--color-primary-main);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;
  background-color: var(--color-background-paper);
  cursor: pointer;
`

export const subMenuLinksDiv = isOpen => css`
  display: flex;
  flex-direction: column;
  transition: transform 400ms ease-in-out;
  ${isOpen ? "" : SlideClosed}
`

// TODO
/*
const modifySessionScrollTop = thisRef => {
  // this is for the edge case when you close a submenu
  // then click on a link further down the page: the scrollTop is too high.
  // Before we close the submenu, we have to add that height
  // to the sessionStorage scrollTop
  // 1. grab the height of me when open
  const componentScrollHeight = thisRef.current.scrollHeight
  // 2. grab the current scrollTop in session mem
  const sOldScrollTop = window.sessionStorage.getItem(
    SESSION_STORAGE_SCROLLTOP_KEY
  )
  if (!sOldScrollTop) {
    return
  }
  const oldScrollTop = Number(sOldScrollTop)
  if (isNaN(oldScrollTop)) {
    return
  }
  // 3. add 1 and 2 and store in session mem
  const newScrollTop = oldScrollTop + componentScrollHeight
  console.log(
    `modifySessionScrollTop: newScrollTop ${newScrollTop} = oldScrollTop ${oldScrollTop} + componentScrollHeight ${componentScrollHeight}`
  )
  // store it in session mem
  window.sessionStorage.setItem(SESSION_STORAGE_SCROLLTOP_KEY, newScrollTop)
}
*/

// TODO implement animation
/*
  ${isOpen
    ? "display: flex;"
    : "display: none; "}
  transition: all 1.0s ease;
  postion: relative;
  transform-origin: top;
  -ms-transform: scale(1,.5);
  -webkit-transform: scale(1,.5); 
  transform: scale(1,.5);
  */
