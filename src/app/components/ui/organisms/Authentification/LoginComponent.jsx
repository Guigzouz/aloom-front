import { Container } from "../../atoms";
import useFormInput from "../../../hooks/useFormInput";
import useAuthStore from "../../../../store/authStore"; // Import Zustand store
import { Form } from "../../molecules";
import toast from "react-hot-toast";

const LoginComponent = () => {
  const { input, handleInputChange } = useFormInput({
    email: "",
    password: "",
  });

  const login = useAuthStore((state) => state.login); // Extract login method from store

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Login input here:", input);

      await login(input); // Call the login method from the store
      toast.success(`Welcome ${input.email}! `);
      // Optionally handle additional logic after successful login
    } catch (error) {
      toast.error(error.message || "An error occurred while login in");

      console.error("Login error:", error); // Handle the error if needed
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
        <Form.Base configs={loginFormConfigs} onSubmit={handleLogin} />
      </Container.Form>
      <span className="cursor-pointer underline hover:text-white">
        Forgot your password?
      </span>
    </div>
  );
};

export default LoginComponent;
