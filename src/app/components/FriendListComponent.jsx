import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Use named import for jwtDecode
import { useCookies } from "react-cookie";

import { handleFriendListLoading } from "../data-access-layer/friends-access-object";

const FriendListComponent = () => {
  const [cookies] = useCookies(["jwt_authorization"]);
  const [userId, setUserId] = useState(null);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    if (cookies.jwt_authorization) {
      const decodedJwt = jwtDecode(cookies.jwt_authorization);
      console.log(decodedJwt._id);
      setUserId(decodedJwt._id);
    }
  }, [cookies.jwt_authorization]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (userId) {
        try {
          const data = await handleFriendListLoading(userId);
          setFriendsList(data.friendsList);
        } catch (error) {
          console.error("Error fetching friend list:", error);
        }
      }
    };

    fetchFriends();
  }, [userId]);

  return (
    <>
      {friendsList.length > 0 ? ( // Check if friendsList has any elements
        <div>
          <ul>
            {friendsList.map((friend) => (
              <li key={friend.id}>{friend.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-white">friends list</div>
      )}
    </>
  );
};

export default FriendListComponent;
