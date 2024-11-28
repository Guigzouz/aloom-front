import { handleLoginEvent } from "../../../data-access-layer/auth-access-object";
import { Container } from "../../atoms";
import Form from "../../molecules/Form";
import useFormInput from "../../hooks/useFormInput";

const LoginComponent = () => {
  const { input, handleInputChange } = useFormInput({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("login input here:", input);
      await handleLoginEvent(input);
      // Optionally handle any additional logic here after successful login
    } catch (error) {
      // Handle the error if needed
    }
  };

  const loginFormConfigs = [
    {
      name: "email",
      type: "email",
      id: "user-email",
      placeholder: "Email",
      isRequired: true,
      onChange: handleInputChange,
    },
    {
      name: "password",
      type: "password",
      id: "current-password",
      placeholder: "Password",
      isRequired: true,
      onChange: handleInputChange,
    },
  ];

  return (
    <div className="text-left p-5">
      <h2 className="font-bold text-2xl uppercase pb-2 text-white text-center">
        Log in
      </h2>
      <Container.Form>
        <Form configs={loginFormConfigs} onSubmit={handleLogin} />
      </Container.Form>
      <span className="cursor-pointer underline hover:text-white">
        Forgot your password?
      </span>
    </div>
  );
};

export default LoginComponent;
