const apiUrl = import.meta.env.VITE_API_URL;

export const handleFriendListLoading = async (userId) => {
  try {
    const response = await fetch(
      `${apiUrl}/friendship/get-friends-list/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );

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
