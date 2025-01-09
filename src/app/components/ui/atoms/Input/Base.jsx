import PropTypes from "prop-types";

const Base = ({ className, ...props }) => {
  return (
    <input
      className={`p-2 w-full border rounded ${className}`}
      {...props}
    ></input>
  );
};

Base.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Base;
