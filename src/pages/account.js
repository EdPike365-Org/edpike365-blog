import React from "react"
import { Link } from "gatsby"
import { useAuth0 } from "@auth0/auth0-react"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import Layout from "../components/layout/Layout"

//using tut https://auth0.com/blog/securing-gatsby-with-auth0/

const Account = () => {

  const { user } = useAuth0()

  return (
    <Layout>
      <div>
        <h2>Account</h2>
        This is auth protected using Auth0.
        <Link to="/">Home</Link>
        <p>Email: {user.email} </p>
      </div>
    </Layout>
  )
}

export default withAuthenticationRequired(Account)
