import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Container, Input } from "../../atoms";
import { Interaction } from "../../molecules";

const FormTextArea = ({ configs, onSubmit }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = (newImages) => {
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDelete = (imageUrl) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((img) => img !== imageUrl)
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      text: e.target.elements[0].value, // Extracting text input value
      images: uploadedImages, // Sending uploaded images along with text
    });
  };

  return (
    <Container.Form className="flex h-full flex-col gap-2 relative">
      {configs.map((config, i) => (
        <div key={i} className="absolute z-[10]  h-full">
          {config.isImageUploadingAvailable && (
            <Interaction.Upload
              configs={{ previewImage: true }}
              onUpload={handleUpload}
              onDelete={handleDelete}
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
            <div className="flex flex-row gap-2 absolute z-99">
              {uploadedImages.length > 0 ? (
                uploadedImages.map((image, index) => (
                  <div key={index} className="relative w-12 h-12">
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button.IconButton
                      icon="BsTrash"
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleDelete(image)}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 z-99">No images uploaded</p>
              )}
            </div>
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
      isImageUploadingAvailable: PropTypes.bool,
      submitButtonType: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormTextArea;
