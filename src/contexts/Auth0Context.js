import React from "react"
import { navigate } from 'gatsby';
import { Auth0Provider } from '@auth0/auth0-react';

// This lets us redirect the user to the page they were trying to get to
// before they were asked to log in.
// IFFF they were not trying to get to a specific page,
// the appState will be null, and we will redirect them to the home page.
// https://auth0.com/docs/libraries/auth0-react#redirecting-after-login
const onRedirectCallback = (appState) => {
    // Use Gatsby's navigate method to replace the url
    navigate(appState?.returnTo || '/', { replace: true })
}

export const Auth0Context = element => {

    const redirectURI = window.location.origin + "/callbacks/auth"

    return (
        <Auth0Provider
            domain={process.env.GATSBY_AUTH0_DOMAIN}
            clientId={process.env.GATSBY_AUTH0_CLIENTID}
            authorizationParams={{
                redirect_uri: redirectURI
                // we can add other arbitrary key: values here
                // but I have not figured out how to pull them out
                // on the callback page
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {element.children}
        </Auth0Provider>
    )
}