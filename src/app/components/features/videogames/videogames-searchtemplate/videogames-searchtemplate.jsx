import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { getVideogamesPlayers } from "../../../../data-access-layer/videogames-access-object";
import { Button } from "../../../ui/atoms";

const SearchTemplatePage = ({ type }) => {
  const { gameId } = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (type === "single" && gameId) {
      const fetchPlayers = async () => {
        setLoading(true);
        setError(null);
        try {
          const token = localStorage.getItem("token"); // Replace with your token logic
          const data = await getVideogamesPlayers(token, gameId);
          setPlayers(data.players || []);
        } catch (err) {
          setError("Failed to load players.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchPlayers();
    }
  }, [type, gameId]);

  const handleChatRequest = (firstName) => {
    toast.success(`Chat request sent to ${firstName}`);
  };

  return (
    <div className="p-6 bg-gray-900 flex flex-col items-center  text-white ">
      <h1 className="text-3xl font-bold">
        {type === "group" ? "Group Search Mode" : "Single Player Search Mode"}
      </h1>
      <p className="mt-4 text-lg">Game ID: {gameId}</p>

      {type === "single" && (
        <div className="mt-6 w-full max-w-5xl">
          {loading && <p className="text-center">Loading players...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!loading && !error && players.length === 0 && (
            <p className="text-center">No players found.</p>
          )}
          {!loading && players.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="bg-gray-800 p-4 rounded-lg flex flex-col items-center transition-transform transform hover:scale-105"
                >
                  <Button.AvatarButton
                    icon="BsPerson"
                    iconOpposite="BsFillPersonFill"
                    onClick={() => handleChatRequest(player.firstName)}
                  />
                  <p className="mt-2 font-bold">
                    {player.firstName} {player.lastName}
                  </p>
                  <p className="text-sm text-gray-400">{player.email}</p>
                  {player.nickname && (
                    <p className="text-sm italic">{player.nickname}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SearchTemplatePage.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchTemplatePage;
