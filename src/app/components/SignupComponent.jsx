import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

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

    console.log("event", input);

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //custom handler because of library specifications
  const handlePhoneChange = (phone, country) => {
    setInput((prev) => ({
      ...prev,
      phoneNumber: phone,
      countryKey: country.alpha2,
    }));

    console.log(JSON.stringify(input));
  };

  const handleSignupEvent = (e) => {
    e.preventDefault;
    console.log(JSON.stringify(input));
  };

  return (
    <>
      <p>Signup</p>
      <form onSubmit={handleSignupEvent}>
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
          <input
            type="text"
            id="first-name"
            name="firstName"
            placeholder="John"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="text"
            id="last-name"
            name="lastName"
            placeholder="Doe"
            onChange={handleInput}
          />
        </div>
        <div>
          <PhoneInput
            defaultCountry="ua"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={(phone, country) => handlePhoneChange(phone, country)}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
};

export default SignupComponent;
