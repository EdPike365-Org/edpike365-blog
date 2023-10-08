import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FormButton } from "/src/components/forms/FormComponents"

const returnToURL = `${window.location.origin}/loggedout`;

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
        logout({ returnTo: returnToURL });
      }}>Log Out</FormButton>
    </>
  );
};

export default LogoutButton;