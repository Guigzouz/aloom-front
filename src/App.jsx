import { useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import "./App.css";
import AuthComponent from "./app/components/auth/AuthComponent";

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
      <div className="text-xl font-bold text-red">test div</div>
      <AuthComponent></AuthComponent>
      {/* <h1>Welcome {decodedJwt.firstName ? decodedJwt.firstName : "Guest"} </h1> */}
    </>
  );
}

export default App;
