import React from "react"
import { Auth0Provider } from '@auth0/auth0-react';
import { navigate } from 'gatsby';

const onRedirectCallback = (appState) => {
    // Use Gatsby's navigate method to replace the url
    navigate(appState?.returnTo || '/', { replace: true });
   };

// we have multiple states in one context
export const Auth0Context = element => {

    return(
    <Auth0Provider
        domain={process.env.AUTH0_DOMAIN}
        clientId={process.env.AUTH0_CLIENTID}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
    >
        {element.children}
    </Auth0Provider>
    )
}