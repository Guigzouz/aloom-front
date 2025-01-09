import PropTypes from "prop-types";

const Form = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Form;
