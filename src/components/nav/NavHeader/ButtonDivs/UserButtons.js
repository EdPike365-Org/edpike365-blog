import React from "react"
import { useAuth0 } from "@auth0/auth0-react";
import UserButton from "../Buttons/UserButton"
import LoginButton from "../Buttons/LoginButton";

const UserButtons = () => {

    const {
        isAuthenticated
    } = useAuth0();

    if (isAuthenticated) {
      return <UserButton />
    } else {
      return <LoginButton />
    }
}

export default UserButtons