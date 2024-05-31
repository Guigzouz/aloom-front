const apiUrl = import.meta.env.VITE_API_URL;

export const getPosts = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/posts/get-posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
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
