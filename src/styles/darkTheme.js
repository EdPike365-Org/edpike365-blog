import { css } from "@emotion/react"

// This requires that coreThemeCSS alreadby be in use, this is a modification overlay
// If you put this css code in a css file, some code, I think webpack, 
// will automatically add it common.js and you will have darkmode on
// If you try to put this in a .txt file, you get a webpack handler error. .txt.css causes problem 1
// TODO figure out how to exclude some css files
export const darkTheme = css`
  :root {
    --color-theme-name: "dark";

    --color-primary-light: #7986cb;
    --color-primary-main: #3f51b5;
    --color-primary-dark: reg(120, 159, 214);
    --color-primary-text: #fff;

    --color-text-primary: rgba(255, 255, 255, 0.7); /* use on default bg */
    --color-text-secondary: #fff; /* use on paper bg */
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
`
