import PropTypes from "prop-types";
import { Button, Container, Input } from "../../atoms";

const FormTextArea = ({ configs, onSubmit }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Container.Form className="flex h-full flex-col gap-2 relative">
      {configs.map((config, i) => (
        <div key={i} className="absolute w-full h-full">
          {config.isImageUploadingAvailable && (
            <Button.IconButton
              icon="BsImage"
              iconOpposite="BsImage"
              type="submit"
              className="absolute bottom-3 left-3 z-10 text-white"
            />
          )}
        </div>
      ))}
      <form onSubmit={handleFormSubmit} className="">
        {configs.map((config, i) => (
          <div key={i} className="absolute w-full h-full">
            {config.submitButtonType === "icon" && (
              <Button.IconButton
                icon="BsSend"
                iconOpposite="BsSendFill"
                type="submit"
                className="absolute bottom-3 right-3 z-10 text-white"
              />
            )}

            {/* Textarea */}
            <Input.Textarea
              name={config.name}
              type={config.type}
              id={config.id}
              placeholder={config.placeholder}
              required={config.isRequired}
              className="bg-aloom-bg-dark rounded-xl h-full resize-none text-white p-5 pr-14"
              onChange={(e) => config.onChange && config.onChange(e)}
            />
          </div>
        ))}
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
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormTextArea;
