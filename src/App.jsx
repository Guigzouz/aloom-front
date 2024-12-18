import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { socket } from "./socket";
import { Toolbar } from "./app/components/organisms";
import HomePage from "./app/pages/HomePage";
import PostsPage from "./app/pages/PostsPage";
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
    // <UserProfileContext.Provider value={userProfile}>
    //   <ToolbarComponent />
    //   {/* <ConnectionState />
    //   <Events />
    //   <ConnectionManager />
    //   <MyForm /> */}
    //   <section className="main-page-section  grid grid-rows-2">
    //     {userProfile ? (
    //       // eslint-disable-next-line react/no-unescaped-entities
    //       <h3 className="text-white">
    //         How's it going, {userProfile.firstName}?
    //       </h3>
    //     ) : (
    //       <h3 className="text-white">Welcome! please log in</h3>
    //     )}
    //     <div className="flex gap-4 px-8">
    //       <PostsListComponent />
    //     </div>
    //   </section>
    //   <PrivateMessagesComponent />
    // </UserProfileContext.Provider>

    <Router>
      <Toolbar.ToolbarComponent />
      <Routes>
        <Route path="/" element={<HomePage userProfile={userProfile} />} />
        <Route
          path="/posts"
          element={<PostsPage userProfile={userProfile} />}
        />
        {/* Add other routes here */}
      </Routes>
      <Toolbar.PrivateMessagesComponent />
    </Router>
  );
}

export default App;
