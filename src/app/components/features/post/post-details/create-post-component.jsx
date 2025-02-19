import useFormInput from "../../../hooks/useFormInput";
import { Button, Container } from "../../../ui/atoms";
import toast from "react-hot-toast";
import { Form } from "../../../ui/molecules";
import { createPost } from "../../../../data-access-layer/posts-access-object";
import useAuthStore from "../../../../store/authStore";

// eslint-disable-next-line react/prop-types
const CreatePostComponent = ({ onClose, displayCloseBtn, onPostCreated }) => {
  const { input, handleInputChange } = useFormInput({
    content: "",
  });

  const jwt = useAuthStore((state) => state.jwt); // Get the token from Zustand store

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      if (!jwt) {
        throw new Error("User is not authenticated");
      }

      await createPost(input.content, jwt); // Pass the content and token
      toast.success("Post created successfully!");
      if (onPostCreated) {
        onPostCreated(); // Call the callback function
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.message || "An error occurred while creating the post");
    }
  };

  const createPostConfigs = [
    {
      name: "content",
      type: "textarea",
      id: "post-content",
      placeholder: "What's up ?",
      isRequired: true,
      submitButtonType: "icon",
      onChange: handleInputChange,
    },
  ];

  return (
    <Container.Base className="mb-5 flex p-5 flex-col rounded-2xl bg-aloom-bg-dark h-[12rem] w-full">
      <div className="justify-between w-full flex ">
        {displayCloseBtn && (
          <Button.IconButton
            icon="BsXSquare"
            iconOpposite="BsXSquareFill"
            onClick={onClose}
          />
        )}
      </div>
      <Container.Form className="h-full">
        <Form.TextArea
          configs={createPostConfigs}
          onSubmit={handleCreatePost}
        />
      </Container.Form>
    </Container.Base>
  );
};

export default CreatePostComponent;
