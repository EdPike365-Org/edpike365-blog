import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FormButton } from "/src/components/forms/FormComponents"

function LogoutButton() {

  const {
    logout, isAuthenticated
  } = useAuth0();
  
  const handleLogout = () => {
    var returnToURL = "renderedInSSG";
    if (typeof window !== 'undefined') {
        returnToURL = `${window.location.origin}/loggedout`;
    }
    console.log("Auth0Context handleLogout() returnToURL = " + returnToURL)
  
    /*
    https://auth0.com/docs/authenticate/login/logout/redirect-users-after-logout
    LogoutOptions: 
    https://auth0.github.io/auth0-spa-js/interfaces/logoutoptions.html
    https://auth0.github.io/auth0-react/interfaces/LogoutOptions.html
        clientID
        logoutParams
        openUrl
    logoutParams
        logoutParams?: {
                federated?: boolean;
                returnTo?: string;
                  Note: If the client_id parameter is included, 
                  the returnTo URL that is provided must be 
                  listed in the Application's "Allowed Logout URLs" in the Auth0 dashboard. 
                  However, if the client_id parameter is not included, 
                  the returnTo URL must be listed in the "Allowed Logout URLs" 
                  at the !!!account level!!! in the Auth0 dashboard.;
                  EdPikes NOTE: ACTUALLY, if the client_id is not included
                  it will use the first Allowed Logout URL in the APPLICATION dashboard.
                [key: string]: any;
        }
        https://auth0.com/docs/authenticate/login/logout/redirect-users-after-logout
  
    */

    // From: https://auth0.com/docs/authenticate/login/logout/redirect-users-after-logout
    // "If the client_id parameter is included and the returnTo URL is not set, 
    // the server returns the user to the first Allowed Logout URLs
    // set in the Dashboard."

    //build a LogoutOptions object and pass it in
    const myLogoutOptions = {
        clientID: process.env.GATSBY_AUTH0_CLIENTID,
        logoutParams: { 
          returnTo: returnToURL
        }
    };
 
    //was logout({ returnTo: window.location.origin });  
    logout(myLogoutOptions);
  
  }

  return isAuthenticated && (
    <>
      <FormButton
        id="logoutButton"
        aria-label={"Log Out"}
        onClick={ handleLogout }
      >Log Out</FormButton>
    </>
  );
};

export default LogoutButton;