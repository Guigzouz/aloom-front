import { useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import "./App.css";
import LoginComponent from "./app/components/LoginComponent";
import SignupComponent from "./app/components/SignupComponent";

function App() {
  const [count, setCount] = useState(0);
  const [cookies] = useCookies(["jwt_authorization"]);
  console.log("cookie log : ", cookies);

  if (cookies.jwt_authorization) {
    const decodedJwt = jwtDecode(cookies.jwt_authorization);
    console.log(decodedJwt);
  }

  return (
    <>
      {/* <LoginComponent></LoginComponent> */}
      <SignupComponent></SignupComponent>
      {/* <h1>Welcome {decodedJwt.firstName ? decodedJwt.firstName : "Guest"} </h1> */}
    </>
  );
}

export default App;
