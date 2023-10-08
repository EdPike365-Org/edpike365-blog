import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import Layout from "../../components/layout/Layout"
//import { SPARedirectLoginOptions } from '@auth0/auth0-spa-js';

//audience?: string;
/**
 * The name of the connection configured for your application.
 * If null, it will redirect to the Auth0 Login Page and show
 * the Login Widget.
 */
//connection?: string;
/**
 * The organization to log in to.
 *
 * This will specify an `organization` parameter in your user's login request.
 *
 * - If you provide an Organization ID (a string with the prefix `org_`), it will be validated against the `org_id` claim of your user's ID Token. The validation is case-sensitive.
 * - If you provide an Organization Name (a string *without* the prefix `org_`), it will be validated against the `org_name` claim of your user's ID Token. The validation is case-insensitive.
 *
 */
//organization?: string;
/**
 * The Id of an invitation to accept. This is available from the user invitation URL that is given when participating in a user invitation flow.
 */
//invitation?: string;
/**
 * The default URL where Auth0 will redirect your browser to with
 * the authentication result. It must be whitelisted in
 * the "Allowed Callback URLs" field in your Auth0 Application's
 * settings. If not provided here, it should be provided in the other
 * methods that provide authentication.
 */
//redirect_uri?: string;
/**
 * If you need to send custom parameters to the Authorization Server,
 * make sure to use the original parameter name.
 */
//[key: string]: any;


/**
 * ```js
 * const {
 *   // Auth state:
 *   error,
 *   isAuthenticated,
 *   isLoading,
 *   user,
 *   // Auth methods:
 *   getAccessTokenSilently,
 *   getAccessTokenWithPopup,
 *   getIdTokenClaims,
 *   loginWithRedirect,
 *   loginWithPopup,
 *   logout,
 * } = useAuth0<TUser>();
 **/


/* variables are set or used in:
    netlify env vars
    .env.development
    .env.production
    /src/contexts/Auth0Context.js
    auth0 dashboard
    each social IDP dashboard
    LoginButton.js
    LogoutButton.js

*/

const AuthCallback = ({location}) => {
    console.log("we visited AuthCallback")
    console.log("AuthCallback location = " + JSON.stringify(location, null, 2))
    //const x = SPARedirectLoginOptions;
    const { user, isAuthenticated, error } = useAuth0()

    console.log("AuthCallback stringified user = " + JSON.stringify(user, null, 2))
//TODO if error, show error here
//TODO, consider not using layout so wont show footer
    return (
    <Layout>
      <div>

       </div>
    </Layout>
  )
}

export default AuthCallback