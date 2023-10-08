import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FormButton } from "/src/components/forms/FormComponents"

// https://auth0.com/docs/authenticate/login/logout/redirect-users-after-logout

const getReturnToURL = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/loggedout`;
  } else {
    return `${process.env.GATSBY_SITE_URL}/loggedout`; 
  }
} 

function LogoutButton() {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  return isAuthenticated && (
    <>
    <FormButton
      id="logoutButton"
      aria-label={"Log Out"}
      onClick={() => {
        //was logout({ returnTo: window.location.origin });
        logout({ returnTo: getReturnToURL });
      }}>Log Out</FormButton>
    </>
  );
};

export default LogoutButton;