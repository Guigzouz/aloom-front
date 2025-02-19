import { useEffect } from "react";
import PropTypes from "prop-types";
import { useModal } from "../../../../providers/ModalProvider";

const Base = ({ children, modalId }) => {
  const { activeModal, closeModal } = useModal();

  const handleClickOutside = (event) => {
    if (event.target.id === "modal-backdrop") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (activeModal !== modalId) return null; // Only render if this modal is active

  return (
    <section
      id="modal-backdrop"
      className="p-2 w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center w-full justify-center"
      >
        {children}
      </div>
    </section>
  );
};

Base.propTypes = {
  children: PropTypes.node.isRequired,
  modalId: PropTypes.string.isRequired,
};

export default Base;
