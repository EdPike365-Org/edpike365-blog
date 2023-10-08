import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import commonButtonCSS from "./buttonCSS"
import LoginIcon from "../../../../icons/LoginIcon"
import { css } from "@emotion/react"

const loginButtonCSS = css`
    background-color: var(--color-primary);
    color: var(--color-white);
    &:hover {
      transform: translateX(-1px) translateY(-1px);
    }
`

function LoginButton() {

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return !isAuthenticated && (
    <button
      id="loginButton"
      css={[commonButtonCSS, loginButtonCSS]}
      aria-label={"Log In"}
      onClick={loginWithRedirect}
    ><LoginIcon /></button>
  );
};

export default LoginButton;