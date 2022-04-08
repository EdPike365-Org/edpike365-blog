import styled from "@emotion/styled"
import { HamButton } from "./buttons/HamburgerButton"

// TODO: Make icons use max dimensions from parent containers
// so I can remove the dimensions from the icons.

// THIS IS WHERE THE MESSY MEDIA QUERY STUFF FOR THE HEADER LIVES
// Default to smallest supported size of width 280 (Galaxy Fold)
// We modify visibilty and size of all components in the Header
// or here in major subcomponents (vs letting them set themselves)
// NOTE: dimensions are in px units because we need precision in the header

export const Header = styled.header`
  grid-area: header;

  box-sizing: border-box;
  width: 100%;

  padding: 0rem;
  overflow: hidden;

  display: flex;

  /* Flush logodiv to left if the nav hamburger button is hidden */
  justify-content: space-between;

  /* Align buttons vertically centered */
  align-items: center;

  background-color: var(--color-background-paper);
  transition: color 400ms ease-in-out, background-color 400ms ease-in-out;

  box-shadow: var(--shape-box-shadow);

  /* ---- Tablet (700 x ) ---- */
  /* Ham button gets bigger (other buttons handled by ButtonDivRight) */
  @media only screen and (min-width: 700px) {
    & > ${HamButton} {
      width: 42px;
      height: 42px;
    }
  }

  /* ---- LapTop (1366 x ) ---- */
  /* Navbar permanently shows. Hamburger disappears. */
  @media only screen and (min-width: 1366px) {
    & > ${HamButton} {
      display: none;
    }
    /* TODO: Show more major nav links, like in Vice.com */
  }
`
