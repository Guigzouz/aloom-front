import { io } from "socket.io-client";
const apiUrl = import.meta.env.VITE_API_URL;

// "undefined" means the URL will be computed from the `window.location` object

// const URL =
//   // process is injected by node.js btw
//   // eslint-disable-next-line no-undef
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

// Initialize socket connection with credentials
export const socket = io(`${apiUrl}`, {
  withCredentials: true,
});
