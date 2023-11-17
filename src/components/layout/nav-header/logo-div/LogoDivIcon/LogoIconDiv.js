import React from 'react'
import * as styles from './styles.module.css'
import LogoIconLink from './LogoIconLink'
import LogoIcon from '../../../../../icons/LogoIcon'

const LogoIconDiv = () => {
  return (
    <div id="logoIconDiv" className={`${styles.logoIconDivCSS} logo-icon-div `}>
      <LogoIconLink>
        <LogoIcon />
      </LogoIconLink>
    </div>
  )
}

export default LogoIconDiv
