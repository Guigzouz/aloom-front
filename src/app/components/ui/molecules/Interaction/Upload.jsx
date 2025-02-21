import PropTypes from "prop-types";
import { Button, Container } from "../../atoms";
import { useRef, useState } from "react";
import { uploadPostFile } from "../../../../data-access-layer/posts-access-object";

const Upload = ({ configs, onUpload, onDelete, token }) => {
  const fileInputRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    try {
      const uploadPromises = files.map((file) => uploadPostFile(file, token));
      const uploadedData = await Promise.all(uploadPromises);

      console.log("Uploaded Data:", uploadedData); // Debugging

      const uploadedUrls = uploadedData
        .filter((item) => item?.success && item?.data?.secure_url)
        .map((item) => item.data.secure_url);

      console.log("Extracted Image URLs:", uploadedUrls); // Debugging

      if (uploadedUrls.length > 0) {
        setUploadedImages((prev) => {
          const newImages = [...prev, ...uploadedUrls];

          console.log("Updated Uploaded Images:", newImages); // Debugging

          // ✅ Notify parent component
          onUpload(newImages);

          return newImages;
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDelete = (url) => {
    setUploadedImages((prev) => {
      const updatedImages = prev.filter((image) => image !== url);

      // ✅ Notify parent about deletion
      onDelete(url);

      return updatedImages;
    });
  };

  return (
    <Container.Form>
      <div className="absolute w-full h-full align-end z-99">
        {configs.previewImage && (
          <>
            <Button.IconButton
              icon="BsImage"
              iconOpposite="BsImageFill"
              type="button"
              className="absolute bottom-3 left-3 text-white"
              onClick={handleButtonClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              multiple
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
    </Container.Form>
  );
};

Upload.propTypes = {
  configs: PropTypes.shape({
    previewImage: PropTypes.bool,
  }).isRequired,
  onUpload: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default Upload;
