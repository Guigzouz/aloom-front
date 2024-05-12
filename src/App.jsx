import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import "./App.css";
import ToolbarComponent from "./app/components/navigation/ToolbarComponent";

function App() {
  const [cookies] = useCookies(["jwt_authorization"]);

  if (cookies.jwt_authorization) {
    const decodedJwt = jwtDecode(cookies.jwt_authorization);
    console.log(decodedJwt);
  }

  return (
    <>
      <ToolbarComponent></ToolbarComponent>
    </>
  );
}

export default App;
