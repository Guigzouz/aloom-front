import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

import { handleFriendListLoading } from "../../data-access-layer/friends-access-object";
import { handleUserRetrieveInformations } from "../../data-access-layer/users-access-object";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// eslint-disable-next-line react/prop-types
const FriendListComponent = ({ onSwitchComponent, onSelectFriend }) => {
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
              <li
                className="text-white cursor-pointer flex items-center h-12 m-1 gap-5"
                onClick={() => {
                  onSelectFriend(friend);
                  onSwitchComponent("ChatContainer");
                }}
                key={friend.userInformations.id}
              >
                {/* Need a filepath with img url for pfp */}
                {friend.userInformations.filePath ? (
                  <span>{friend.userInformations.filePath}</span>
                ) : (
                  <AccountCircleIcon
                    sx={{ fontSize: 44, color: "white" }}
                  ></AccountCircleIcon>
                )}
                <div className="friend-infos flex flex-col items-baseline">
                  <span> {friend.userInformations.firstName}</span>
                  <span className="text-sm italic">
                    last online x minutes ago
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-white">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendListComponent;
