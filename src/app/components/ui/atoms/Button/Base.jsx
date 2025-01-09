import PropTypes from "prop-types";

const Base = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

// propTypes validation because why the fuck ?
Base.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Base;
