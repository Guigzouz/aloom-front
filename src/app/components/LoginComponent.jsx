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
    console.log(JSON.stringify(input));

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
        console.log(decodedJwt);

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
      <form onSubmit={handleLoginEvent}>
        <div>
          <input
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="password"
            id="current-password"
            name="password"
            placeholder="******"
            onChange={handleInput}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
};

export default LoginComponent;
