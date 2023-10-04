import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import commonButtonCSS from "./buttonCSS"
import { css } from "@emotion/react"

const loginButtonCSS = css`
    background-color: var(--color-primary);
    color: var(--color-white);
`

function LoginButton() {
 const {
  isAuthenticated,
  loginWithRedirect,
   } = useAuth0();

   return !isAuthenticated && (
    <button 
        id="loginButton"
        css={[commonButtonCSS, loginButtonCSS]}
        aria-label={"Log In"}
        onClick={loginWithRedirect}
    >Log In</button>
  );
};

export default LoginButton;