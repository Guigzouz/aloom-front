import { useState } from "react";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import CloseIcon from "@mui/icons-material/Close";

const AuthComponent = () => {
  const [hasAccount, setHasAccount] = useState(true);

  const handleAuthMethod = (e) => {
    setHasAccount(!hasAccount);
  };
  return (
    <>
      <div className="absolute top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-25">
        <section className="grid grid-cols-2 rounded-2xl h-[34rem] diagonal-gradient w-[1000px]">
          {/*todo :  if time is sufficient, try to make a roll between different images  */}
          <div className="bg-lol-jhin bg-center rounded-l-2xl text-left flex flex-col justify-between">
            <h1 className="text-white uppercase font-bold w-56 p-5">
              Join the best gamers community in the world
            </h1>
            <p className="text-white text-sm p-5">
              Explore and discovers games, become a better gamer, connect with
              others over mutual interests
            </p>
          </div>

          <div className="p-3">
            <div className="w-full text-right">
              <CloseIcon
                style={{ color: "white", fontSize: 40 }}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-center">
              <img src="src/assets/aloom-logo-text.png" />
            </div>
            {hasAccount == true ? <LoginComponent /> : <SignupComponent />}

            <div>
              <span
                onClick={handleAuthMethod}
                className="cursor-pointer underline  hover:text-white"
              >
                {hasAccount == true
                  ? "no account yet ? signup here"
                  : "already have an account ? log in here"}
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AuthComponent;
