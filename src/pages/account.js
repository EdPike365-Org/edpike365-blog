import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import Layout from "../components/layout/Layout"
import LogoutButton from "../components/nav/NavHeader/Buttons/LogoutButton"
import styled from "@emotion/styled"

//using tut https://auth0.com/blog/securing-gatsby-with-auth0/

const PageHeaderWithButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Account = () => {

  const { user, isAuthenticated } = useAuth0()

  return (
    <Layout>
      <br/>
      <div>
        <PageHeaderWithButton>
          <h2>Account</h2>
          <LogoutButton />
        </PageHeaderWithButton>
        <p>This is auth protected using Auth0. </p>
        <p>Email: {user.email} </p>
        <p>Check out the user data supplied by Auth0, below:</p>
        <pre>{isAuthenticated && JSON.stringify(user, null, 2)}</pre>
      </div>
    </Layout>
  )
}

export default withAuthenticationRequired(Account)
