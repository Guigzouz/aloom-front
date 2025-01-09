import PropTypes from "prop-types";

const Base = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

Base.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Base;
