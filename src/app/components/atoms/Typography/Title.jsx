import PropTypes from "prop-types";

const Title = ({ children, ...props }) => {
  return <h2 {...props}>{children}</h2>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.object,
};

export default Title;
