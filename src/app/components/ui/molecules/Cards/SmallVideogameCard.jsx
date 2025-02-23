import { Container } from "../../atoms";
import PropTypes from "prop-types";

const SmallVideogameCard = ({ configs, onSelect }) => {
  return (
    <Container.Base
      className="bg-gray-800 p-3 rounded-lg flex flex-col items-center cursor-pointer border border-gray-700 transition-transform duration-200 hover:scale-105"
      onClick={() => onSelect(configs.id)}
    >
      {/* Game Logo */}
      <img
        src={configs.gameLogoUrl}
        alt={configs.name}
        className="w-12 h-12 object-contain drop-shadow-md"
      />

      {/* Game Name */}
      <h3 className="text-xs font-semibold mt-2 text-center">{configs.name}</h3>
    </Container.Base>
  );
};

SmallVideogameCard.propTypes = {
  configs: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    gameLogoUrl: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SmallVideogameCard;
