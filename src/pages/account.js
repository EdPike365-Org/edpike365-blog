import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import Layout from "../components/layout/Layout"
import LogoutButton from "../components/nav/NavHeader/Buttons/LogoutButton"

//using tut https://auth0.com/blog/securing-gatsby-with-auth0/

const Account = () => {

  const { user, isAuthenticated } = useAuth0()

  return (
    <Layout>
      <div>
        <h2>Account</h2>
        This is auth protected using Auth0. TODO style Log out button
        <br/>
        <LogoutButton /> 
        <br/>
        <p>Email: {user.email} </p>
        <p>Check out the user data supplied by Auth0, below:</p>
        <pre>{isAuthenticated && JSON.stringify(user, null, 2)}</pre>
      </div>
    </Layout>
  )
}

export default withAuthenticationRequired(Account)
