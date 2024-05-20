import { useState, useContext } from "react";
import AuthComponent from "../auth/AuthComponent";
import LoginIcon from "@mui/icons-material/Login";

const ToolbarComponent = () => {
  const [isAuthActive, setIsAuthActive] = useState(false);

  const handleAuthentification = () => {
    setIsAuthActive(true);
  };

  const handleAuthClose = () => {
    setIsAuthActive(false);
  };

  return (
    <>
      <section className="aloom-main-toolbar bg-aloom-bg-dark-second h-full w-24 rounded-3xl">
        <div className="flex flex-col items-center justify-between h-full p-5">
          {/* either user pfp or loginIcon */}
          <div>
            <img src="src/assets/aloom-panda.png" />
          </div>
          <LoginIcon
            className="cursor-pointer"
            sx={{ fontSize: 36, color: "white" }}
            onClick={handleAuthentification}
          ></LoginIcon>
        </div>
      </section>

      {isAuthActive && (
        <AuthComponent onClose={handleAuthClose}></AuthComponent>
      )}
    </>
  );
};

export default ToolbarComponent;
