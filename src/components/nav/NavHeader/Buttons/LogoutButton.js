import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import commonButtonCSS from "./buttonCSS"
import { css } from "@emotion/react"

const logoutButtonCSS = css`
    background-color: var(--color-primary);
    color: var(--color-white);
`

function LogoutButton() {
 const {
   isAuthenticated,
   logout,
   } = useAuth0();

   return isAuthenticated && (
     <button 
     id="logoutButton"
     css={[commonButtonCSS, logoutButtonCSS]}
     aria-label={"Log Out"}
     onClick={() => {
     logout({ returnTo: window.location.origin });
    }}>Log Out</button>
 );
};

export default LogoutButton;