import { Button, Container } from "../../atoms";
import PropTypes from "prop-types";

//todo : fetch all possible reaction for user

const Menu = ({ onSelect, userId }) => {
  const fetchedIcons = null;

  return (
    <Container.Base>
      {/* {fetchedIcons.map((icon, i) => (
        <Button.ReactionIconButton
          key={i}
          reactionName={icon.reactionName}
          reactionImgUrl={icon.reactionImgUrl}
          onClick={onSelect}
        />
      ))} */}
    </Container.Base>
  );
};
Menu.propTypes = {
  configs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  userId: PropTypes.number,
};

export default Menu;
