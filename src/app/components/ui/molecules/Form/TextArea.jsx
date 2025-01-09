import PropTypes from "prop-types";
import { Button, Container, Input } from "../../atoms";

const FormTextArea = ({ configs, onSubmit }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Container.Form className="h-full">
      <form
        onSubmit={handleFormSubmit}
        className="flex h-full flex-col gap-2 items-center"
      >
        {configs.map((config, i) => (
          <Input.Textarea
            name={config.name}
            type={config.type}
            id={config.id}
            placeholder={config.placeholder}
            required={config.isRequired}
            key={i}
            className="mb-5 bg-aloom-bg-dark rounded-xl h-full resize-none text-white p-5"
            onChange={(e) => config.onChange && config.onChange(e)}
          />
        ))}
        <Button.Base
          className="w-full bg-[#282828] border rounded-lg font-semibold text-white text-base px-3 py-3 hover:bg-white hover:text-aloom-bg-dark" // Add hover opacity
          type="submit"
        >
          SUBMIT
        </Button.Base>
      </form>
    </Container.Form>
  );
};

FormTextArea.propTypes = {
  configs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      isRequired: PropTypes.bool,
      onChange: PropTypes.func,
      height: PropTypes.string, // Add height to propTypes
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormTextArea;
