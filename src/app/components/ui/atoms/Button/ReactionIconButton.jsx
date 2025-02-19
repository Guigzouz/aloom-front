import PropTypes from "prop-types";

const ReactionIconButton = ({
  reactionName,
  reactionImgUrl,
  className,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={className}>
      <img src={reactionImgUrl} alt={reactionName} />
    </button>
  );
};

ReactionIconButton.propTypes = {
  reactionName: PropTypes.string.isRequired,
  reactionImgUrl: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default ReactionIconButton;
