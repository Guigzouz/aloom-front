import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";

const LoginComponent = () => {
  const cookies = new Cookies();

  // Need to set the user globally, zustand ?

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLoginEvent = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(input),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        // Return the response body as JSON
        return res.json();
      })
      .then((data) => {
        const decodedJwt = jwtDecode(data.jwt);

        cookies.set("jwt_authorization", data.jwt, {
          expires: new Date(decodedJwt.exp * 1000),
        });
      })
      .catch((error) => console.error("Error:", error));
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
            onSubmit={handleLoginEvent}
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
