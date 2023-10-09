import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import Layout from "../../components/layout/Layout"

const AuthCallback = ({ location }) => {

    const { user, error } = useAuth0()

    //console.log("AuthCallback stringified user = " + JSON.stringify(user, null, 2))
    //TODO if error, show error here
    //TODO add a full page overlay spinner here
    return (
        <Layout suppressFooter>
            <h1>Loggin in......</h1>
        </Layout>
    )
}

export default AuthCallback