import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object

// const URL =
//   // process is injected by node.js btw
//   // eslint-disable-next-line no-undef
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

// Initialize socket connection with credentials
export const socket = io("http://localhost:3000", {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": true,
  },
});
