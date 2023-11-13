import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import UserButton from '../UserButton/UserButton'
import LoginButton from '../LoginButton/LoginButton'

const AccountButtons = () => {
  const { isAuthenticated } = useAuth0()

  if (isAuthenticated) {
    return <UserButton />
  } else {
    return <LoginButton title="Login" />
  }
}

export default AccountButtons
