import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";

const AuthComponent = () => {
  return (
    <>
      <div>
        <h1 className="bg-red-800">
          Join the best gamers community in the world
        </h1>
      </div>
      <p>auth here</p>
      <div>
        <LoginComponent></LoginComponent>
        <SignupComponent></SignupComponent>
      </div>
    </>
  );
};

export default AuthComponent;
