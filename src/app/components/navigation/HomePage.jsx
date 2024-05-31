import React from "react";
import PostsListComponent from "../PostsListComponent";
import PrivateMessagesComponent from "./PrivateMessagesComponent";
import ToolbarComponent from "./ToolbarComponent";

const HomePage = ({ userProfile }) => {
  return (
    <section className="main-page-section grid grid-rows-2">
      {userProfile ? (
        <h3 className="text-white">How's it going, {userProfile.firstName}?</h3>
      ) : (
        <h3 className="text-white">Welcome! Please log in</h3>
      )}
      <div className="flex gap-4 px-8">
        <PostsListComponent />
      </div>
    </section>
  );
};

export default HomePage;
