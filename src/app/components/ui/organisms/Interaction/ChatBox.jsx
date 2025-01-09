import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../../atoms";
import ChatContainerComponent from "../../molecules/ChatContainerComponent";
import FriendListComponent from "../../molecules/FriendListComponent";

const ChatBox = ({ isChatExpanded, onChatToggle }) => {
  const [activeComponent, setActiveComponent] = useState("FriendList");
  const [selectedFriend, setSelectedFriend] = useState(null);

  const renderActiveComponent = () => {
    if (activeComponent === "ChatContainer") {
      return (
        <ChatContainerComponent
          friend={selectedFriend}
          onSwitchComponent={setActiveComponent}
        />
      );
    }
    return (
      <FriendListComponent
        onSelectFriend={setSelectedFriend}
        onSwitchComponent={setActiveComponent}
      />
    );
  };

  return (
    <div
      className={` chatbox bottom-[2rem] right-[2rem] bg-aloom-bg-dark-second p-5 absolute bottom-0 right-0 rounded-3xl transition-all duration-300 ${
        isChatExpanded
          ? "w-96 h-[41rem] border border-aloom-bg-dark"
          : "w-24 h-24 flex items-center justify-center"
      }`}
    >
      {isChatExpanded ? (
        <div className="h-full">
          <div className="w-full text-right">
            <Button.IconButton icon="BsXLg" onClick={onChatToggle} size={40} />
          </div>
          {renderActiveComponent()}
        </div>
      ) : (
        <Button.IconButton
          icon="BsSend"
          iconOpposite="BsFillSendFill"
          onClick={onChatToggle}
          size={36}
        />
      )}
    </div>
  );
};
ChatBox.propTypes = {
  isChatExpanded: PropTypes.bool.isRequired,
  onChatToggle: PropTypes.func.isRequired,
};

export default ChatBox;
