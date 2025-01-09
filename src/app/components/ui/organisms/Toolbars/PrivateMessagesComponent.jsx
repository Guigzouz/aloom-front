import { useState } from "react";
import { Button, Modal } from "../../atoms";
import { Authentification, Interaction } from "..";

const PrivateMessagesComponent = () => {
  const [isAuthActive, setIsAuthActive] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const toggleAuthModal = () => {
    console.log("im goind throudh toggle auth");
    setIsAuthActive(!isAuthActive);
  };
  const toggleChatBox = () => setIsChatExpanded(!isChatExpanded);

  return (
    <section className="flex flex-col items justify-between">
      <div className="chatbox p-5 rounded-3xl bg-aloom-bg-dark-second transition-all duration-300 w-24 h-[14rem]">
        <Button.IconButton
          icon="BsFillPersonFill"
          onClick={toggleAuthModal}
          size={40}
        />
      </div>
      <Interaction.ChatBox
        isChatExpanded={isChatExpanded}
        onChatToggle={toggleChatBox}
      />

      {isAuthActive ? (
        <Modal.Base>
          <Authentification.AuthComponent
            isActive={isAuthActive}
            onClose={toggleAuthModal}
          />
        </Modal.Base>
      ) : null}
    </section>
  );
};

export default PrivateMessagesComponent;
