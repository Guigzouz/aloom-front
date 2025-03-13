import { useState } from "react";
import PropTypes from "prop-types";

import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Typography } from "../../atoms";
import useAuthStore from "../../../../store/authStore";

const AuthComponent = ({ onClose }) => {
  const [hasAccount, setHasAccount] = useState(true);
  const { jwt, logout } = useAuthStore();

  /* Prevents esLint type errors */
  AuthComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  const handleAuthMethod = () => {
    setHasAccount(!hasAccount);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Container.Base className="absolute grid grid-cols-2 rounded-2xl h-[34rem] diagonal-gradient w-[1000px]">
      <div className="bg-lol-jhin bg-center rounded-l-2xl text-left flex flex-col justify-between">
        <h1 className="text-white uppercase font-bold w-56 p-5">
          Join the best gamers community in the world
        </h1>
        <p className="text-white text-sm p-5">
          Explore and discover games, become a better gamer, connect with others
          over mutual interests
        </p>
      </div>

      <div className="p-3">
        <div className="w-full text-right">
          <CloseIcon
            style={{ color: "white", fontSize: 40 }}
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="flex justify-center">
          <img src="/assets/aloom-logo-text.png" alt="Aloom Logo" />
        </div>

        {/* Check if the user is logged in */}
        {jwt ? (
          <div className="text-center mt-20">
            <Typography.Paragraph>
              You are alredy logged in !
            </Typography.Paragraph>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {hasAccount ? <LoginComponent /> : <SignupComponent />}
            <div>
              <span
                onClick={handleAuthMethod}
                className="cursor-pointer underline hover:text-white"
              >
                {hasAccount
                  ? "No account yet? Sign up here."
                  : "Already have an account? Log in here."}
              </span>
            </div>
          </>
        )}
      </div>
    </Container.Base>
  );
};

export default AuthComponent;
