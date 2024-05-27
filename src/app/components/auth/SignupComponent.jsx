import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import { handleSignupEvent } from "../../data-access-layer/auth-access-object";
import "react-international-phone/style.css";

const SignupComponent = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: 0,
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
    console.log(phone, country);
    if (country) {
      setInput((prev) => ({
        ...prev,
        countryKey: country.country.iso2,
        phoneNumber: phone,
      }));
    } else {
      console.error("Country is undefined");
    }

    console.log(input);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await handleSignupEvent(input);
      // Optionally handle any additional logic here after successful login
    } catch (error) {
      // Handle the error if needed
    }
  };

  return (
    <>
      <div className="text-left p-5">
        <h2 className="font-bold text-2xl uppercase pb-2 text-white text-center">
          Sign up
        </h2>
        <form
          onSubmit={handleSignup}
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
          <div className="w-[400px]">
            <button className="w-full bg-[#282828] rounded-lg font-semibold text-white text-base px-3 py-3">
              NEXT
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupComponent;
