import React from "react"
import * as styles from "./icons.module.css"
//https://www.freecodecamp.org/news/how-to-import-svgs-in-react-and-vite/

//let classNames = classnames(styles.sideMenu, { [styles.active]: this.props.menuOpen });
const HamburgerIcon = () => {
  return (
    <svg
    
      id="hamburgerIcon"
      className={`${styles.commonIconCSS} hamburger-icon`}
      
      viewBox="0 0 448 512"
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
    </svg>
  )
}

export default HamburgerIcon
