import React, { createContext, useContext, useState } from "react";

const EditLayoutContext = createContext();

export const useEditLayout = () => {
  const context = useContext(EditLayoutContext);
  if (!context) {
    throw new Error("useEditLayout must be used within an EditLayoutProvider");
  }
  return context;
};

export const EditLayoutProvider = ({ children }) => {
  const [isLayoutEditable, setIsLayoutEditable] = useState(false);

  const toggleLayoutEditor = () => {
    setIsLayoutEditable((prev) => !prev);
  };

  return (
    <EditLayoutContext.Provider
      value={{ isLayoutEditable, toggleLayoutEditor }}
    >
      {children}
    </EditLayoutContext.Provider>
  );
};
