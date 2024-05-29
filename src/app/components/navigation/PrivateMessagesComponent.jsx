import { useState } from "react";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";

import AuthComponent from "../auth/AuthComponent";
import FriendListComponent from "../FriendListComponent";
import ChatContainerComponent from "../ChatContainerComponent";

const PrivateMessagesComponent = () => {
  const [isAuthActive, setIsAuthActive] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState("FriendList");
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAuthentification = () => {
    setIsAuthActive(true);
  };

  const handleAuthClose = () => {
    setIsAuthActive(false);
  };

  const handleChatDisplay = () => {
    setIsChatExpanded(!isChatExpanded);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "FriendList":
        return (
          <FriendListComponent
            onSwitchComponent={setActiveComponent}
            onSelectFriend={setSelectedFriend}
          />
        );
      case "ChatContainer":
        return (
          <ChatContainerComponent
            onSwitchComponent={setActiveComponent}
            friend={selectedFriend}
          />
        );
      default:
        return (
          <FriendListComponent
            onSwitchComponent={setActiveComponent}
            onSelectFriend={setSelectedFriend}
          />
        );
    }
  };

  return (
    <>
      <section className="relative flex flex-col justify-between">
        <div
          className={`chatbox p-5 rounded-3xl bg-aloom-bg-dark-second transition-all duration-300 ${
            isChatExpanded ? "w-24 h-[14rem]" : "w-24 h-[49rem]"
          }  `}
        >
          <AccountCircleIcon
            sx={{ fontSize: 48, color: "white" }}
            className="cursor-pointer "
            onClick={handleAuthentification}
          ></AccountCircleIcon>
        </div>

        <div
          className={`chatbox p-5  rounded-3xl bg-aloom-bg-dark-second  transition-all duration-300 ${
            isChatExpanded
              ? "w-96 h-[41rem]"
              : "w-24 h-24  flex items-center justify-center"
          } absolute bottom-0 right-0`}
        >
          {isChatExpanded ? (
            <div className=" h-full">
              <div className="w-full text-right">
                <CloseIcon
                  style={{ color: "white", fontSize: 40 }}
                  className="cursor-pointer"
                  onClick={handleChatDisplay}
                />
              </div>
              {renderActiveComponent()}
            </div>
          ) : (
            <QuestionAnswerIcon
              sx={{ fontSize: 36, color: "white" }}
              onClick={handleChatDisplay}
              className="cursor-pointer "
            ></QuestionAnswerIcon>
          )}
        </div>
      </section>

      {isAuthActive && (
        <AuthComponent onClose={handleAuthClose}></AuthComponent>
      )}
    </>
  );
};

export default PrivateMessagesComponent;
