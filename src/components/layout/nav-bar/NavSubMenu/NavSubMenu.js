import React, { useState, useLayoutEffect } from 'react'
import * as styles from './NavSubMenu.module.css'

//TODO: add option for exclusive open. Will require a "radio group" mechanism.
const NavSubMenu = ({ title, uuid, children, defaultOpen = false }) => {
  // the default useState value has to match the defaultOpen default value
  const [isOpen, setIsOpen] = useState(defaultOpen)

  // if isOpen state is stored in sessionStorage, use that
  // otherwise, use the defaultOpen prop
  // useLayoutEffect to prevent seeing the redraw
  useLayoutEffect(() => {
    const statusStr = sessionStorage.getItem(uuid)
    if (statusStr === null) {
      setIsOpen(defaultOpen)
    } else {
      setIsOpen(statusStr.toLowerCase() === 'true')
    }
  }, [uuid, defaultOpen])

  // We only want to run the open/close animation/transition when toggle is called
  // otherwise the animation will run on every page load
  const [showAnim, setShowAnim] = useState(false)
  const toggleOpen = () => {
    console.log('toggleOpen called, was ' + isOpen + ' now is + ' + !isOpen)
    setShowAnim(true)
    setIsOpen(!isOpen)
    // at this point, isOpen state has still not updated, so !isOpen
    sessionStorage.setItem(uuid, !isOpen)
  }

  return (
    <>
      <button
        role="menuitem"
        aria-label={title}
        aria-controls={uuid + '-menu'}
        aria-haspopup="true"
        aria-expanded={isOpen}
        id={uuid}
        className={styles.expandButton}
        onClick={toggleOpen}
      >
        {title} {isOpen ? '  -' : '  +'}
      </button>
      <ul
        role="menu"
        aria-labelledby={uuid}
        id={uuid + '-menu'}
        className={`
            ${styles.ulCSS}  
            ${showAnim && styles.ulTransition}
            ${isOpen ? styles.showOpen : styles.showClosed}
          `}
      >
        {children}
      </ul>
    </>
  )
}

export default NavSubMenu
