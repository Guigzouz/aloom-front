import { useState } from "react";

const useFormInput = (initialValues) => {
  const [input, setInput] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { input, handleInputChange };
};

export default useFormInput;
