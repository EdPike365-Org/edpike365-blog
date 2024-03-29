import React, { useState, useLayoutEffect, useContext } from 'react'
import { Link } from 'gatsby'
import { NavContext } from '../../../../contexts/NavContext'
import * as styles from './NavSubMenuWithLink.module.css'
import * as linksDivStyles from './linksDiv.module.css'

//TODO: add option for exclusive open. Will require a "radio group" mechanism.
//TODO: any child links should call scrollIntoView on its parent (this)
const NavSubMenuWithLink = ({
  title,
  navTarget,
  uuid,
  children,
  defaultOpen = false,
}) => {
  // When we nav to a new page, let the navContext know.
  // It might close the navBar if we are on a mobile device.
  const { showNavState } = useContext(NavContext)
  const toggleShowNav = showNavState[1] //[0] is the state, [1] is the setter

  /* Scroll Height Reservation Workarounds:
    - Works: defaultOpen = "true" and usestate(true) work correctly
    because on first session visit, all submenus are open, and UA (the browser)
    sets the scrollHeight(or max-height TODO?) to the max possible height.
    If the user closes some submenus, scrollTop, etc, will still work.
    - false/true sorta works but it is pure luck if the user opens "too many" submenus.
      and- Works: defaultOpen = "false" and usestate(false) work correctly
    - false/false, and true/false does not work at all. This causes all submenus to be closed
    on first visit. The navUL will never respond to scroll calls.
  */
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
    <ul className={styles.navSubMenuUL}>
      <div className={styles.subMenuActionsDiv}>
        <Link
          onClick={toggleShowNav}
          className={styles.navLink}
          activeClassName={styles.activeLinkStyle}
          partiallyActive={true}
          to={navTarget}
        >
          {title}
        </Link>
        <button
          className={styles.expandButton}
          onClick={toggleOpen}
          role="treeitem"
          aria-expanded={isOpen}
        >
          {isOpen ? '  -' : '  +'}
        </button>
      </div>
      <div
        className={`
            ${linksDivStyles.divCSS}  
            ${showAnim && linksDivStyles.divCSSTransition}
            ${isOpen ? linksDivStyles.showOpen : linksDivStyles.showClosed}
            `}
        role="group"
      >
        {children}
      </div>
    </ul>
  )
}

//${isOpen? linksDivStyles.showOpen : linksDivStyles.showClosed }
export default NavSubMenuWithLink
