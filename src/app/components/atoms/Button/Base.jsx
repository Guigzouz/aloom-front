import PropTypes from "prop-types";

const Base = ({ children }) => {
  return (
    <button className="w-full bg-[#282828] rounded-lg font-semibold text-white text-base px-3 py-3">
      {children}
    </button>
  );
};

// propTypes validation because why the fuck ?
Base.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Base;
