const apiUrl = import.meta.env.VITE_API_URL;

export const handleLoginEvent = async (input) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    // Return the data (including the JWT) to be handled by the Zustand store
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const handleSignupEvent = async (input) => {
  try {
    const response = await fetch(`${apiUrl}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data; // Optionally return data if needed
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
