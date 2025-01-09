import { create } from "zustand";

import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import {
  handleLoginEvent,
  handleSignupEvent,
} from "../data-access-layer/auth-access-object";

const cookies = new Cookies();

const useAuthStore = create((set, get) => ({
  jwt: cookies.get("jwt_authorization") || null, // Initialize from cookies if available

  // Login method
  login: async (input) => {
    try {
      const data = await handleLoginEvent(input);
      const decodedJwt = jwtDecode(data.jwt);

      // Store JWT in cookies and Zustand
      cookies.set("jwt_authorization", data.jwt, {
        expires: new Date(decodedJwt.exp * 1000),
      });
      set({ jwt: data.jwt });

      return data; // Optionally return data if needed
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  // Signup method
  signup: async (input) => {
    try {
      const data = await handleSignupEvent(input);
      return data; // Optionally return response data if needed
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  },

  // Logout method
  logout: () => {
    cookies.remove("jwt_authorization");
    set({ jwt: null });
  },

  // Decode JWT (optional utility)
  decodeJwt: () => {
    const jwt = get().jwt;
    if (jwt) {
      try {
        return jwtDecode(jwt);
      } catch (error) {
        console.error("Failed to decode JWT:", error);
        return null;
      }
    }
    return null;
  },
}));

export default useAuthStore;
