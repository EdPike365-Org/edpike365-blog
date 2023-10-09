import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import Layout from "../../components/layout/Layout"
//import { SPARedirectLoginOptions } from '@auth0/auth0-spa-js';

const AuthCallback = ({location}) => {
   // console.log("we visited AuthCallback")
    //console.log("AuthCallback location = " + JSON.stringify(location, null, 2))
    //const x = SPARedirectLoginOptions;
    const { user, error } = useAuth0()

    //console.log("AuthCallback stringified user = " + JSON.stringify(user, null, 2))
//TODO if error, show error here
//TODO, consider not using layout so wont show footer
    return (
    <Layout>
    </Layout>
  )
}

export default AuthCallback