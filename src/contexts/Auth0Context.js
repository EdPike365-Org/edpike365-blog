import React from "react"
import { Auth0Provider } from '@auth0/auth0-react';
import { navigate } from 'gatsby';

// This lets us redirect the user to the page they were trying to get to
// before they were asked to log in.
// https://auth0.com/docs/libraries/auth0-react#redirecting-after-login
const onRedirectCallback = (appState) => {
    // Use Gatsby's navigate method to replace the url
    console.log("Auth0Context onRedirectCallback appState = " + appState)
    navigate(appState?.returnTo || '/', { replace: true });
};

// we have multiple states in one context
export const Auth0Context = element => {
    
    // window.location.origin is the protocol + hostname + port
    //console.log("Auth0Context window.location.origin = " + window.location.origin)
    
    const redirectURI = window.location.origin + "/callbacks/auth"
    //console.log("Auth0Context redirectURI = " + redirectURI)
     
    return (
        <Auth0Provider
            domain={process.env.GATSBY_AUTH0_DOMAIN}
            clientId={process.env.GATSBY_AUTH0_CLIENTID}
            authorizationParams={{ 
                redirect_uri: redirectURI
                // we can add other arbitrary key: values here
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {element.children}
        </Auth0Provider>
    )
}