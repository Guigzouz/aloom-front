const apiUrl = import.meta.env.VITE_API_URL;

export const getReactions = async (token, userId) => {
  try {
    const response = await fetch(
      `${apiUrl}/reactions/${userId}/get-reactions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
