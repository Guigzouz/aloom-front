import { createContext, useContext, useState } from "react";

// Create the context
const AuthentificationContext = createContext();

// Custom hook for consuming the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthentification = () => {
  const context = useContext(AuthentificationContext);
  if (!context) {
    throw new Error(
      "useAuthentification must be used within an AuthentificationProvider"
    );
  }
  return context;
};

// Provider component
// eslint-disable-next-line react/prop-types
export const AuthentificationProvider = ({ children }) => {
  const [isAuthActive, setIsAuthActive] = useState(false);

  const toggleAuthModal = () => {
    setIsAuthActive((prev) => !prev);
  };

  return (
    <AuthentificationContext.Provider value={{ isAuthActive, toggleAuthModal }}>
      {children}
    </AuthentificationContext.Provider>
  );
};
