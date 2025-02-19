import useFormInput from "../../../hooks/useFormInput";
import { Button, Container } from "../../../ui/atoms";
import toast from "react-hot-toast";
import { Form } from "../../../ui/molecules";
import {
  createPost,
  getPostDetails,
} from "../../../../data-access-layer/posts-access-object";
import useAuthStore from "../../../../store/authStore";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import PostListItem from "../post-list-items/post-list-item";

// eslint-disable-next-line react/prop-types
const CreateCommentComponent = ({
  onClose,
  displayCloseBtn,
  onCommentCreated,
  postContent,
}) => {
  const [cookies] = useCookies(["jwt_authorization"]);
  const [postDetails, setPostDetails] = useState([]);

  const { input, handleInputChange, resetInput } = useFormInput({
    content: "",
  });

  const displayAuthorDetails = () => {
    console.log("wsp homeboy");
  };

  const jwt = useAuthStore((state) => state.jwt); // Get the token from Zustand store

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      if (!jwt) {
        throw new Error("User is not authenticated");
      }
      await createPost(input.content, jwt, postDetails.id); // Pass the content and token

      toast.success("Comment created successfully!");

      // Fetch updated post details including new comment
      const updatedPostDetails = await getPostDetails(
        cookies.jwt_authorization,
        postContent.id
      );
      setPostDetails(updatedPostDetails.postDetails);

      resetInput(); // Optionally clear the input field after submission

      if (onCommentCreated) {
        onCommentCreated(); // Call the callback function
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(
        error.message || "An error occurred while creating the comment"
      );
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = cookies.jwt_authorization;
        if (token) {
          const data = await getPostDetails(token, postContent.id);
          setPostDetails(data.postDetails);
        } else {
          console.error("JWT token is not available in cookies");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, [cookies.jwt_authorization, postContent.id]); // Add dependencies for re-fetching when these change

  console.log(
    "post details from query : ",
    postDetails.parentPost?.author.firstName
  );
  const createPostConfigs = [
    {
      name: "content",
      type: "textarea",
      id: "post-content",
      placeholder: `Comment on ${postContent.author.firstName}'s post`,
      isRequired: true,
      submitButtonType: "icon",
      onChange: handleInputChange,
    },
  ];

  return (
    <Container.Base className="flex p-5 flex-col rounded-2xl bg-aloom-bg-dark h-2/3 w-2/3">
      {/* Modal Header */}
      <div className="justify-between w-full flex">
        {displayCloseBtn && (
          <Button.IconButton
            icon="BsXSquare"
            iconOpposite="BsXSquareFill"
            onClick={onClose}
          />
        )}
      </div>

      <div className="text-white flex flex-col text-start bg-aloom-bg-dark p-5 border-b border-aloom-white mb-5">
        {postDetails.parentPost && (
          <div className="text-aloom-orange mb-3">
            <span className="underline">
              Responding to {postDetails.parentPost.author.firstName}{" "}
              {postDetails.parentPost.author.lastName} on
            </span>
            <span>{` "${postDetails.parentPost.content}"`}</span>
          </div>
        )}
        <div className="flex">
          <Button.AvatarButton
            icon="BsPerson"
            iconOpposite="BsFillPersonFill"
            onClick={displayAuthorDetails}
          />{" "}
          <span className="font-bold">{postContent.author.firstName}</span>
        </div>
        <div className="text-start max-w-md">{postContent.content}</div>
        <div className="flex mt-2 gap-4 justify-evenly">
          <div className="flex gap-5 items-center">
            <span>NaN</span>
            <Button.IconButton
              icon="BsFillChatLeftTextFill"
              iconOpposite="BsFillChatLeftTextFill"
              size={26}
            />
          </div>
          <div className="flex gap-5 items-center">
            <span>NaN</span>
            <Button.IconButton
              icon="BsHeart"
              iconOpposite="BsHeartFill"
              size={26}
            />
          </div>
          <div className="flex gap-5 items-center">
            <span>NaN</span>
            <Button.IconButton
              icon="BsShare"
              iconOpposite="BsShareFill"
              onClick={displayAuthorDetails}
              size={26}
            />
          </div>
        </div>
      </div>

      <Container.Form className="h-[140px]">
        <Form.TextArea
          configs={createPostConfigs}
          onSubmit={handleCreatePost}
        />
      </Container.Form>
      {/* Display Replies */}
      {postDetails.replies && postDetails.replies.length > 0 && (
        <div className="mt-5">
          <div className="flex flex-col gap-2 overflow-scroll h-[250px]">
            {postDetails.replies.map((post, index) => (
              <PostListItem key={index} postContent={post} />
            ))}
          </div>
        </div>
      )}
    </Container.Base>
  );
};

export default CreateCommentComponent;
