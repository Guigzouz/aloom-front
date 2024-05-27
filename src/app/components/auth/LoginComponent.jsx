import { useState } from "react";
import { handleLoginEvent } from "../../data-access-layer/auth-access-object";

const LoginComponent = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await handleLoginEvent(input);
      // Optionally handle any additional logic here after successful login
    } catch (error) {
      // Handle the error if needed
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="text-left p-5">
        <h2 className="font-bold text-2xl uppercase pb-2 text-white text-center">
          Log in
        </h2>
        <div>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-2 items-center"
          >
            <input
              className="aloom-text-input"
              type="email"
              id="user-email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
            />
            <input
              className="aloom-text-input"
              type="password"
              id="current-password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <div className="w-[400px]">
              <button className="w-full bg-[#282828] rounded-lg font-semibold text-white text-base px-3 py-3">
                NEXT
              </button>
            </div>
          </form>
        </div>
      </div>
      <span className="cursor-pointer underline hover:text-white">
        forgot your password ?
      </span>
    </>
  );
};

export default LoginComponent;
