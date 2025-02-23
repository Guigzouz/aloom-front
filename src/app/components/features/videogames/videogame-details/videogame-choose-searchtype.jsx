import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const VideogameChooseSearchtype = ({ game }) => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    navigate(`/social/${game.id}/${type}`);
  };

  return (
    <div className="p-6 bg-gray-900 rounded-2xl flex flex-col items-center gap-6">
      {/* Game Header */}
      <div className="flex flex-col items-center">
        <img
          src={game.gameLogoUrl}
          alt={game.name}
          className="w-24 h-24 object-contain drop-shadow-lg"
        />
      </div>

      {/* Search Options */}
      <div className="flex gap-6">
        {/* Search as a Group */}
        <div
          className="p-6 bg-gray-800 rounded-xl flex flex-col items-center w-48 cursor-pointer border border-gray-700 transition-all hover:scale-105 hover:border-blue-500"
          onClick={() => handleSelect("group")}
        >
          <img
            src={game.presentationImgUrl}
            alt={`${game.name} - Group Search`}
            className="w-full h-32 object-cover rounded-md"
          />
          <h3 className="mt-3 text-white font-semibold">Search as a Group</h3>
        </div>

        {/* Search as a Single Player */}
        <div
          className="p-6 bg-gray-800 rounded-xl flex flex-col items-center w-48 cursor-pointer border border-gray-700 transition-all hover:scale-105 hover:border-green-500"
          onClick={() => handleSelect("single")}
        >
          <img
            src={game.presentationImgUrl}
            alt={`${game.name} - Single Player`}
            className="w-full h-32 object-cover rounded-md"
          />
          <h3 className="mt-3 text-white font-semibold">
            Search as a Single Player
          </h3>
        </div>
      </div>
    </div>
  );
};

VideogameChooseSearchtype.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    gameLogoUrl: PropTypes.string.isRequired,
    presentationImgUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideogameChooseSearchtype;
