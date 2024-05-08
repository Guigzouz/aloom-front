import { useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import "./App.css";
import AuthComponent from "./app/components/auth/AuthComponent";

function App() {
  const [cookies] = useCookies(["jwt_authorization"]);

  if (cookies.jwt_authorization) {
    const decodedJwt = jwtDecode(cookies.jwt_authorization);
    console.log(decodedJwt);
  }

  return (
    <>
      <AuthComponent></AuthComponent>
    </>
  );
}

export default App;
