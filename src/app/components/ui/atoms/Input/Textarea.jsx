import PropTypes from "prop-types";

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={`p-2 w-full border rounded ${className}`}
      {...props}
    ></textarea>
  );
};

Textarea.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Textarea;
