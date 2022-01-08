import React from "react"
import Layout from "../components/layout/Layout"
import { Router } from "@reach/router"
import { Link } from "gatsby"

//using tut https://auth0.com/blog/securing-gatsby-with-auth0/

const Home = () => <p>Home</p>
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const Account = () => (
  <>
    <nav>
      <Link to="/account">Home</Link>{" "}
      <Link to="/account/settings">Settings</Link>{" "}
      <Link to="/account/billing">Billing</Link>{" "}
    </nav>
    This will be using Amplify web federated auth backed by Cognito. You will be
    able to use Google and Facebook. I thought about using Auth0 or Okta, but
    this is harder and in the end I will definitely have easy access to
    Authrorization to various AWS services using IAM.
    <Router>
      <Home path="/account" />
      <Settings path="/account/settings" />
      <Billing path="/account/billing" />
    </Router>
  </>
)

export default Account
