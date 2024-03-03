import React from 'react'
import { navigate } from 'gatsby'
import * as styles from '../Buttons.module.css'
import UserCircleIcon from '../../../../../../icons/UserCircleIcon'
import { useAuth0 } from '@auth0/auth0-react'

const handleClick = () => {
  navigate('/account')
}

//Note: if button has no dimensions, or no text, icons wont render
const UserButton = () => {
  const { user } = useAuth0()
  const { picture } = user

  function UserImage() {
    if (picture) {
      return <img src={picture} alt="Profile" referrerPolicy="no-referrer" />
    } else {
      return <UserCircleIcon />
    }
  }

  return (
    <button
      id="userButton"
      className={`${styles.commonButtonCSS} ${styles.userButtonCSS} user-button`}
      aria-label={'User Account Settings'}
      title="User Account Settings"
      onClick={handleClick}
    >
      <UserImage />
    </button>
  )
}

export default UserButton
