import { useState } from "react";
import { Button, Modal } from "../../atoms";
import { Authentification, Interaction } from "..";
import { useModal } from "../../../../providers/ModalProvider"; // import the useModal hook

const PrivateMessagesComponent = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const { openModal, closeModal } = useModal(); // Destructure openModal and closeModal from the context

  const toggleAuthModal = () => {
    openModal("auth-modal"); // Trigger opening the auth modal
  };

  const toggleChatBox = () => setIsChatExpanded((prevState) => !prevState);

  return (
    <section className="flex flex-col items justify-between">
      <div className="chatbox p-5 rounded-3xl bg-aloom-bg-dark-second transition-all duration-300 w-24 h-[14rem]">
        <Button.IconButton
          icon="BsPerson"
          iconOpposite="BsPersonFill"
          onClick={toggleAuthModal}
          size={40}
        />
      </div>

      <Interaction.ChatBox
        isChatExpanded={isChatExpanded}
        onChatToggle={toggleChatBox}
      />

      {/* Modal for Authentication, controlled by the useModal context */}
      <Modal.Base modalId="auth-modal" onClose={closeModal}>
        <Authentification.AuthComponent onClose={closeModal} />
      </Modal.Base>
    </section>
  );
};

export default PrivateMessagesComponent;
