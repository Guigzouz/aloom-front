import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure this is a default import if jwt-decode exports it as default
import { useCookies } from "react-cookie";

import { handleFriendListLoading } from "../data-access-layer/friends-access-object";
import { handleUserRetrieveInformations } from "../data-access-layer/users-access-object";

const FriendListComponent = () => {
  const [cookies] = useCookies(["jwt_authorization"]);
  const [userId, setUserId] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [detailedFriendsList, setDetailedFriendsList] = useState([]);

  useEffect(() => {
    if (cookies.jwt_authorization) {
      const decodedJwt = jwtDecode(cookies.jwt_authorization);
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

  useEffect(() => {
    const fetchFriendDetails = async (friendId) => {
      try {
        const data = await handleUserRetrieveInformations(friendId);
        return data; // Assume this returns detailed friend information
      } catch (error) {
        console.error("Error fetching friend details for ID:", friendId, error);
        return null;
      }
    };

    const loadFriendDetails = async () => {
      if (friendsList.length > 0) {
        const detailsPromises = friendsList.map((friend) =>
          fetchFriendDetails(friend.friendId)
        );
        const details = await Promise.all(detailsPromises);
        setDetailedFriendsList(details.filter((detail) => detail !== null));
      }
    };

    loadFriendDetails();
  }, [friendsList]);

  return (
    <>
      {detailedFriendsList.length > 0 ? (
        <div>
          <ul>
            {detailedFriendsList.map((friend) => (
              <li className="text-white" key={friend.userInformations.id}>
                {friend.userInformations.firstName}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-white">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendListComponent;
