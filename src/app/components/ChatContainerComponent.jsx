import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../../socket";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";

const ChatContainerComponent = ({ onSwitchComponent, friend }) => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [cookies] = useCookies(["jwt_authorization"]);
  const [userProfile, setUserProfile] = useState(null);

  // Decode JWT to get user profile
  useEffect(() => {
    if (cookies.jwt_authorization) {
      const decodedJwt = jwtDecode(cookies.jwt_authorization);
      setUserProfile(decodedJwt);
    } else {
      setUserProfile(null); // Clear user profile if JWT is not present
    }
  }, [cookies.jwt_authorization]);

  // Ensure userId is defined
  const userId = userProfile ? userProfile._id : null;

  useEffect(() => {
    if (!userId) return; // Exit if userId is not defined

    const roomId = getRoomId(userId, friend.userInformations.id);
    socket.emit("joinRoom", { roomId });

    socket.on("receiveMessage", ({ sender, message, timestamp }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender, message, timestamp },
      ]);
    });

    console.log("Joined room:", roomId);

    // Cleanup on component unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [friend.userInformations.id, userId]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!userId) return; // Exit if userId is not defined

    const roomId = getRoomId(userId, friend.userInformations.id);
    const timestamp = new Date();
    socket.emit("sendMessage", {
      roomId,
      sender: userId,
      message: messageInput,
      timestamp,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: userId, message: messageInput, timestamp },
    ]);
    setMessageInput("");
  };

  // Generate a unique room ID based on two user IDs
  function getRoomId(userId, friendId) {
    return [userId, friendId].sort().join("-");
  }

  return (
    <section className="chat-container h-[93%] p-2.5">
      <div className="chat-infos flex justify-between my-4">
        <ArrowBackIosIcon
          sx={{ fontSize: 24, color: "white" }}
          className="cursor-pointer"
          onClick={() => {
            onSwitchComponent("FriendList");
          }}
        />
        <div className="flex items-center gap-2">
          <AccountCircleIcon sx={{ fontSize: 24, color: "white" }} />
          <span className="text-white">
            {friend.userInformations.firstName}
          </span>
          <div className="h-[15px] w-[15px] bg-aloom-orange rounded-full inline-block"></div>
        </div>
      </div>
      <div className="bg-aloom-bg-dark h-[90%] rounded-2xl flex flex-col justify-between">
        <div className="messages-list max-h-full overflow-auto p-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-container flex flex-col mb-3 ${
                msg.sender === userId ? "ml-auto" : ""
              }`}
            >
              <div className="timestamp text-white text-xs mb-1">
                {dayjs(msg.timestamp).format("HH:mm, DD MMM YYYY")}
              </div>
              <div
                className={`message w-fit text-white rounded-lg p-2 ${
                  msg.sender === userId
                    ? "bg-aloom-orange self-end"
                    : "bg-aloom-bg-dark-second self-start"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex items-end w-full">
          <textarea
            name="message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-grow rounded-2xl resize-none overflow-hidden h-auto min-h-[1em] leading-[1.5em] max-h-[120px] bg-aloom-bg-dark border border-aloom-orange text-white p-2 pr-14"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-aloom-orange rounded-2xl absolute right-[41px] bottom-[44px]"
          >
            <SendIcon sx={{ color: "white" }} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatContainerComponent;
