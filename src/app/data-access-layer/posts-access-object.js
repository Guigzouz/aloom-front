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

export const uploadPostFile = async (file, token) => {
  if (!file) throw new Error("No file provided for upload");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${apiUrl}/files/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // No need to set Content-Type manually
      },
      body: formData,
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Returns the uploaded file details, including data.url
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const getPostDetails = async (token, postId) => {
  try {
    const response = await fetch(`${apiUrl}/posts/get-post/${postId}`, {
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
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createPost = async (postContent, token, replyToUserPostId) => {
  try {
    const response = await fetch(`${apiUrl}/posts/create-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify({ content: postContent, replyToUserPostId }),
    });

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
