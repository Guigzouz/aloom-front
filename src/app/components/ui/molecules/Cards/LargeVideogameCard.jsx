import { Container } from "../../atoms";
import PropTypes from "prop-types";

const LargeVideogameCard = ({ configs, onSelect }) => {
  return (
    <Container.Base
      className="relative bg-gray-900 p-6 rounded-xl flex flex-col items-center cursor-pointer border border-gray-700 transition-transform duration-200 hover:scale-105"
      onClick={() => onSelect(configs.id)}
    >
      {/* Game Logo positioned at the top center */}
      <img
        src={configs.gameLogoUrl}
        alt={configs.name}
        className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-20 object-contain drop-shadow-md"
      />

      {/* Main presentation image */}
      <img
        src={configs.presentationImgUrl}
        alt={configs.name}
        className="w-full h-54 object-cover rounded-lg"
      />
    </Container.Base>
  );
};

LargeVideogameCard.propTypes = {
  configs: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    gameLogoUrl: PropTypes.string.isRequired,
    presentationImgUrl: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default LargeVideogameCard;
