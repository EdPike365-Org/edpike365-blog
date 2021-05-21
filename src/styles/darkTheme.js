import { css } from "@emotion/react"

// This requires that coreThemeCSS already be in use, this is a modification overlay

// I wanted to add this from a CSS file so the CSS file would have formatting, BUT
// if you put this css code in a css file, some code, I think webpack,
// will automatically add it to common.js and you will have darkmode on all the time, or it will always be
// overwritten by the core theme, based on which order the mystery adder adds it.
// If you try to put this in a .txt file, you get a webpack handler error.
// TODO figure out how to exclude some css files. Maybe it just needs to be in another folder.
export const darkTheme = css`
  :root {
    /* sets scroll bar colors */
    color-scheme: dark;

    --color-theme-name: "dark";

    --color-primary-light: #7986cb;
    --color-primary-main: #3f51b5;
    --color-primary-dark: #7986cb;
    --color-primary-text: #fff;

    --color-text-primary: rgba(255, 255, 255, 0.7); /* use on default bg */
    --color-text-secondary: rgba(255, 255, 255, 0.9); /* use on paper bg */
    --color-text-disabled: rgba(255, 255, 255, 0.05);
    --color-text-hint: rgba(255, 255, 255, 0.5);

    --color-divider: rgba(255, 255, 255, 0.12);

    /* these colors were inspired by gmail dark mode */
    --color-background-default: #030303; /* aka color-background, the far background */
    --color-background-paper: #111111; /* aka color-surface, as in components */
    --color-foreground: #303030; /* flyouts, popups */

    /* these are affects applied, mainly alpha channel, to objects based on actions */
    --palette-action-active: #fff;
    --palette-action-hover: rgba(255, 255, 255, 0.08);
    --palette-action-hover-opacity: 0.08;
    --palette-action-selected: rgba(255, 255, 255, 0.16);
    --palette-action-selected-opacity: 0.16;
    --palette-action-disabled: rgba(255, 255, 255, 0.3);
    --palette-action-disabled-background: rgba(255, 255, 255, 0.12);
    --palette-action-disabled-opacity: 0.38;
    --palette-action-focus: rgba(255, 255, 255, 0.12);
    --palette-action-focus-opacity: 0.12;
    --palette-action-activated-opacity: 0.24;
  }

  tbody tr:nth-of-type(odd) {
    background: var(--color-grey-900);
  }

  ::-webkit-scrollbar {
    width: auto;
    height: auto;
  }
  ::-webkit-scrollbar-button {
    background-color: #1b1e34;
    border-left: 1px solid var(--color-primary-main);
    border-right: 1px solid var(--color-primary-main);
    background-image: linear-gradient(90deg, rgba(41,54,107,1)0%, #1b1e34 49%, #212058 83%);

  }
  ::-webkit-scrollbar-track {
    border: 3px solid var(--color-primary-main);
  }
  ::-webkit-scrollbar-track-piece {
    background-image: linear-gradient(#212058, #1b1e34);
    border-top: 1px solid var(--color-primary-main);
    border-bottom: 1px solid var(--color-primary-main);

  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--color-grey-900);
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 1px solid var(--color-primary-main);
    background-image: linear-gradient(90deg, rgba(41,54,107,1)0%, #1b1e34 49%, #212058 83%);
  }
  ::-webkit-scrollbar-corner {
    color: pink;
    border-radius: 20px;
  }
  ::-webkit-resizer {
    background-color: purple;
  }
`
