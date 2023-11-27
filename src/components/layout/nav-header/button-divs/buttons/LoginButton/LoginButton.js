import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import * as styles from '../Buttons.module.css'
import LoginIcon from '../../../../../../icons/LoginIcon'

function LoginButton() {
  const { loginWithRedirect } = useAuth0()

  return (
    <button
      id="loginButton"
      className={`${styles.commonButtonCSS} ${styles.loginButtonCSS} login-button`}
      aria-label={'Log In'}
      title={'Log In'}
      onClick={loginWithRedirect}
    >
      <LoginIcon />
    </button>
  )
}

export default LoginButton
