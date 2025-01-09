import { useState, useEffect } from "react";

import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { socket } from "./socket";
import { Toolbar } from "./app/components/ui/organisms";
import HomePage from "./app/pages/HomePage";
import PostsPage from "./app/pages/PostsPage";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

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
      <Toaster />
    </Router>
  );
}

export default App;
