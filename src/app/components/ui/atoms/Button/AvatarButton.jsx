import PropTypes from "prop-types";
import * as Icons from "react-icons/bs"; // Import Bootstrap icons

// TODO : NEED TO ADD THE LOGIC WHERE IF IMAGE EXISTS DISPLAY IT
const AvatarButton = ({
  icon,
  iconOpposite,
  onClick,
  className,
  size,
  color,
}) => {
  // Dynamically get the icon components from react-icons
  const IconComponent = Icons[icon];
  const IconOppositeComponent = Icons[iconOpposite];

  // Check if the icon exists; log an error if not found
  if (!IconComponent) {
    console.error(
      `Icon "${icon}" not found in react-icons/bs. Please check the icon name.`
    );
    return null; // Optionally, return a default icon or placeholder here
  }

  return (
    <button onClick={onClick} className={className} style={{ color }}>
      <span className="icon cursor-pointer">
        <IconComponent size={size} />
      </span>
      {IconOppositeComponent && (
        <span className="icon-opposite">
          <IconOppositeComponent size={size} />
        </span>
      )}
      <style>{`
        .icon-opposite {
          display: none;
        }
        button:hover .icon {
          display: none;
        }
        button:hover .icon-opposite {
          display: inline;
        }
      `}</style>
    </button>
  );
};

AvatarButton.propTypes = {
  icon: PropTypes.string.isRequired, // Icon name as a string
  iconOpposite: PropTypes.string, // Opposite icon name as a string
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

AvatarButton.defaultProps = {
  size: 36,
  color: "white",
};

export default AvatarButton;
