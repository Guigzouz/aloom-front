import PropTypes from "prop-types";

const Base = ({ children }) => {
  return (
    <section className="p-2 w-full h-full absolute top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
      {children}
    </section>
  );
};

Base.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Base;
