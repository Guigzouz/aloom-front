import PropTypes from "prop-types";
import * as Icons from "react-icons/bs"; // Import Bootstrap icons

const IconButton = ({ icon, onClick, className, size, color }) => {
  // Dynamically get the icon component from react-icons
  const IconComponent = Icons[icon];

  // Check if the icon exists; log an error if not found
  if (!IconComponent) {
    console.error(
      `Icon "${icon}" not found in react-icons/bs. Please check the icon name.`
    );
    return null; // Optionally, return a default icon or placeholder here
  }

  return (
    <button onClick={onClick} className={className} style={{ color }}>
      <IconComponent size={size} />
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string.isRequired, // Icon name as a string
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

IconButton.defaultProps = {
  size: 36,
  color: "white",
};

export default IconButton;
