import PropTypes from "prop-types";

const Paragraph = ({ children, ...props }) => {
  return <span {...props}>{children}</span>;
};

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.object,
};

export default Paragraph;
