import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import "./App.css";
import ToolbarComponent from "./app/components/navigation/ToolbarComponent";
import { socket } from "./socket";
// import ConnectionState from "./app/components/ConnectionState";
// import Events from "./app/components/Events";
// import ConnectionManager from "./app/components/ConnectionManager";
// import MyForm from "./app/components/MyForm";

// Create a context to store user profile data
const UserProfileContext = React.createContext();

function App() {
  const [cookies] = useCookies(["jwt_authorization"]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connection succeeded :", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection failed", error);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);
  useEffect(() => {
    if (cookies.jwt_authorization) {
      const decodedJwt = jwtDecode(cookies.jwt_authorization);
      setUserProfile(decodedJwt);
    } else {
      setUserProfile(null); // Clear user profile if JWT is not present
    }
  }, [cookies.jwt_authorization]);

  return (
    <UserProfileContext.Provider value={userProfile}>
      <ToolbarComponent />
      {/* <ConnectionState />
      <Events />
      <ConnectionManager />
      <MyForm /> */}

      {userProfile ? (
        <h3 className="text-white">How's it going, {userProfile.firstName}?</h3>
      ) : (
        <h3 className="text-white">Welcome! please log in</h3>
      )}
    </UserProfileContext.Provider>
  );
}

export default App;
