import { useState } from "react";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";

const AuthComponent = () => {
  const [hasAccount, setHasAccount] = useState(true);

  const handleAuthMethod = (e) => {
    setHasAccount(!hasAccount);
  };
  return (
    <>
      <section className="grid grid-cols-2 bg-aloom-orange rounded-2xl h-[32rem]">
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

        <div className="p-5">
          <div className="flex justify-center">
            <img src="src/assets/aloom-logo-text.png" />
          </div>
          {hasAccount == true ? <LoginComponent /> : <SignupComponent />}

          <div>
            <span
              onClick={handleAuthMethod}
              className="cursor-pointer underline"
            >
              {hasAccount == true
                ? "no account yet ? signup here"
                : "already have an account ? log in here"}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthComponent;
