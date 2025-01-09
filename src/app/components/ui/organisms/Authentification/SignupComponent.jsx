import { useState } from "react";
import useAuthStore from "../../../../store/authStore"; // Import the Zustand store
import { Form } from "../../molecules";

const SignupComponent = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    countryKey: "",
  });

  const signup = useAuthStore((state) => state.signup); // Get the signup method from the store

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(input); // Call the signup method from the store
      console.log("Signup successful:", data); // Handle success if needed
    } catch (error) {
      console.error("Signup error:", error); // Handle error
    }
  };

  const signupFormConfigs = [
    {
      name: "email",
      type: "email",
      id: "user-email",
      placeholder: "example@yahoo.com",
      isRequired: true,
      onChange: handleInput,
    },
    {
      name: "password",
      type: "password",
      id: "current-password",
      placeholder: "******",
      isRequired: true,
      onChange: handleInput,
    },
    {
      name: "firstName",
      type: "text",
      id: "first-name",
      placeholder: "John",
      isRequired: true,
      onChange: handleInput,
    },
    {
      name: "lastName",
      type: "text",
      id: "last-name",
      placeholder: "Doe",
      isRequired: true,
      onChange: handleInput,
    },
  ];

  return (
    <div className="text-left p-5">
      <h2 className="font-bold text-2xl uppercase pb-2 text-white text-center">
        Sign up
      </h2>
      <Form.Base configs={signupFormConfigs} onSubmit={handleSignup} />
    </div>
  );
};

export default SignupComponent;
