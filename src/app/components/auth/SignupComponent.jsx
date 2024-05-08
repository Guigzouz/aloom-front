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
  };

  const handleSignupEvent = (e) => {
    e.preventDefault;
  };

  return (
    <>
      <div className="text-left p-5">
        <h2 className="font-bold text-2xl uppercase pb-2 text-white text-center">
          Sign up
        </h2>
        <form
          onSubmit={handleSignupEvent}
          className="flex flex-col gap-2 items-center"
        >
          <input
            className="aloom-text-input"
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
            onChange={handleInput}
          />
          <input
            className="aloom-text-input"
            type="password"
            id="current-password"
            name="password"
            placeholder="******"
            onChange={handleInput}
          />
          <input
            className="aloom-text-input"
            type="text"
            id="first-name"
            name="firstName"
            placeholder="John"
            onChange={handleInput}
          />
          <input
            className="aloom-text-input"
            type="text"
            id="last-name"
            name="lastName"
            placeholder="Doe"
            onChange={handleInput}
          />
          <PhoneInput
            className="aloom-react-international-phone-input"
            defaultCountry="fr"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={(phone, country) => handlePhoneChange(phone, country)}
          />
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupComponent;
