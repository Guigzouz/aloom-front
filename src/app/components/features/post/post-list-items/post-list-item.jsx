import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCommentIcon from "@mui/icons-material/AddComment";
import MoodIcon from "@mui/icons-material/Mood";
import CommentComponent from "../post-details/CommentComponent";

// eslint-disable-next-line react/prop-types
const PostListItem = ({ postContent, key }) => {
  console.log("here postContent:", postContent);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState([]);

  const handleComment = () => {
    console.log("hey");
    setIsCommentModalVisible(true);
  };
  const handleCommentClose = () => {
    setIsCommentModalVisible(false);
  };
  return (
    <div className="text-white post-container p-3 border border-aloom-orange rounded-2xl mb-5">
      {isCommentModalVisible && (
        <CommentComponent onClose={handleCommentClose}></CommentComponent>
      )}
      <div className="tags-container flex justify-start gap-2 mb-2">
        {/* loop through post tags here */}
        <span className="tag bg-aloom-orange text-sm px-2 rounded">
          Yapping
        </span>
        <span className="tag bg-aloom-orange text-sm  px-2 rounded ">
          League Of Legends
        </span>
      </div>
      <div className="flex  gap-2">
        <AccountCircleIcon
          sx={{ fontSize: 44, color: "white" }}
        ></AccountCircleIcon>
        <div className="author-content-container flex flex-col items-baseline">
          <div className="author gap-2 flex font-bold">
            <span>{postContent.author.firstName}</span>
            <span>{postContent.author.lastName}</span>
          </div>

          <div className="content-container max-w-md text-start">
            {postContent.content}
          </div>
        </div>
      </div>

      <div className="interaction-container flex mt-2 gap-2">
        <AddCommentIcon
          sx={{ backgroundColor: "aloom-disabled-grey" }}
          className="cursor-pointer"
          onClick={handleComment}
        ></AddCommentIcon>
        <MoodIcon sx={{}}></MoodIcon>
      </div>
    </div> // Render each post title or other post data
  );
};

export default PostListItem;
