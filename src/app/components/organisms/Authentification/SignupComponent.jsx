import { useState } from "react";
import { handleSignupEvent } from "../../../data-access-layer/auth-access-object";
import Form from "../../molecules/Form";

const SignupComponent = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    countryKey: "",
  });

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
      await handleSignupEvent(input);
    } catch (error) {
      console.error("Signup error:", error);
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
      <Form configs={signupFormConfigs} onSubmit={handleSignup} />
    </div>
  );
};

export default SignupComponent;
