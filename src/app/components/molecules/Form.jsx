import PropTypes from "prop-types";
import { Button, Container, Input } from "../atoms";

const Form = ({ configs, onSubmit }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Container.Form>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-2 items-center"
      >
        {configs.map((config, i) => (
          <Input.Base
            name={config.name}
            type={config.type}
            id={config.id}
            placeholder={config.placeholder}
            required={config.isRequired}
            key={i}
            onChange={(e) => config.onChange && config.onChange(e)}
          />
        ))}
        <Button.Base type="submit">NEXT</Button.Base>
      </form>
    </Container.Form>
  );
};

Form.propTypes = {
  configs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      isRequired: PropTypes.bool,
      onChange: PropTypes.func,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
