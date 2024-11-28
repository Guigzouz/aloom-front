import PropTypes from "prop-types";

const Base = ({ children }) => {
  return (
    <div className="grid grid-cols-2 rounded-2xl h-[34rem] diagonal-gradient w-[1000px]">
      {children}
    </div>
  );
};

Base.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Base;
