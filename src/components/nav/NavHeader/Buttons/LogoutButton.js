import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {FormButton} from "/src/components/forms/FormComponents"

function LogoutButton() {
 const {
   isAuthenticated,
   logout,
   } = useAuth0();

   return isAuthenticated && (
     <FormButton 
     id="logoutButton"     
     aria-label={"Log Out"}
     onClick={() => {
     logout({ returnTo: window.location.origin });
    }}>Log Out</FormButton>
 );
};

export default LogoutButton;