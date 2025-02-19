import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext); // ✅ Fix: use ModalContext instead of ModalProvider
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalId) => {
    setActiveModal(modalId); // ✅ Ensures only one modal is open at a time
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
