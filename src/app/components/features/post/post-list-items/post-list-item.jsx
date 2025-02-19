import { useModal } from "../../../../providers/ModalProvider";
import { Button, Modal } from "../../../ui/atoms";
import { Dropdown } from "../../../ui/molecules";
import CreateCommentComponent from "../post-details/create-comment-component";

// Utility function to calculate time ago
const getTimeAgo = (date) => {
  const updatedAt = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now - updatedAt);
  const diffMinutes = Math.floor(diffTime / (1000 * 60)); // Difference in minutes
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60)); // Difference in hours
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Difference in days

  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else {
    return `${diffDays} days ago`;
  }
};

// eslint-disable-next-line react/prop-types
const PostListItem = ({ postContent }) => {
  const { openModal, closeModal, activeModal } = useModal();

  const handleCommentCreated = () => {
    console.log("BB!");
    closeModal(); // Automatically close modal when comment is created
  };

  // Handle click on the entire post item to open the modal
  const handlePostClick = () => {
    openModal(`commentModal-${postContent.id}`); // Open the modal with a unique modalId
  };

  // Prevent modal opening when clicking on buttons (heart, share, etc.)
  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="text-white bg-aloom-bg-dark p-4 border-2 border-aloom-bg-dark-second rounded-2xl cursor-pointer hover:bg-aloom-bg-dark-second hover:border-aloom-bg-dark"
      onClick={handlePostClick} // Toggle modal when clicking anywhere on the post item
    >
      {activeModal === `commentModal-${postContent.id}` && ( // Check for the specific modal ID
        <Modal.Base
          modalId={`commentModal-${postContent.id}`}
          onClose={closeModal}
        >
          {" "}
          {/* Pass the unique modalId */}
          <CreateCommentComponent
            displayCloseBtn={true}
            onCommentCreated={handleCommentCreated}
            postContent={postContent}
            onClose={closeModal}
          />
        </Modal.Base>
      )}
      <div className="flex items-center gap-2 mb-2">
        <Button.AvatarButton
          icon="BsPerson"
          iconOpposite="BsFillPersonFill"
          onClick={() => console.log("Author details")}
        />
        <span className="font-bold">{postContent.author.firstName}</span>
        {postContent.replyToUserPostId && (
          <Button.IconButton
            icon="BsReply"
            iconOpposite="BsReplyFill"
            onClick={(e) => {
              handleButtonClick(e);
              console.log("Reply to post", postContent.replyToUserPostId);
            }} // Prevent modal toggle when clicking the reply button
            size={26}
            color={"#FF521B"}
          />
        )}
        <span>{getTimeAgo(postContent.updatedAt)}</span>
      </div>

      <div className="text-start max-w-md">{postContent.content}</div>

      <div className="flex mt-2 gap-4 justify-evenly">
        <div className="flex gap-5 items-center">
          <span>{postContent.userRepliesCount}</span>
          <Button.IconButton
            icon="BsFillChatLeftTextFill"
            iconOpposite="BsFillChatLeftTextFill"
            onClick={handleButtonClick} // Prevent modal toggle when clicking the chat button
            size={26}
          />
        </div>
        <div className="flex gap-5 items-center">
          <span>{postContent.userReactionsCount}</span>
          <Dropdown.Menu userId={"test"} />
        </div>
        <div className="flex gap-5 items-center">
          <span>NaN</span>

          <Button.IconButton
            icon="BsShare"
            iconOpposite="BsShareFill"
            onClick={handleButtonClick} // Prevent modal toggle when clicking the share button
            size={26}
          />
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
