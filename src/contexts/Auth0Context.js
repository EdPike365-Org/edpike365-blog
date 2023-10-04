import React from "react"
import { Auth0Provider } from '@auth0/auth0-react';
import { navigate } from 'gatsby';

const onRedirectCallback = (appState) => {
    // Use Gatsby's navigate method to replace the url
    navigate(appState?.returnTo || '/', { replace: true });
   };

// we have multiple states in one context
export const Auth0Context = element => {

    //domain={process.env.AUTH0_DOMAIN}
    //clientId={process.env.AUTH0_CLIENTID}
    return(
    <Auth0Provider
        domain={process.env.GATSBY_AUTH0_DOMAIN}
        clientId={process.env.GATSBY_AUTH0_CLIENTID}
        authorizationParams={{ redirect_uri: window.location.origin }} 
        onRedirectCallback={onRedirectCallback}
    >
        {element.children}
    </Auth0Provider>
    )
}