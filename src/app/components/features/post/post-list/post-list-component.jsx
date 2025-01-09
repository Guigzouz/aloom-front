import { useEffect, useState } from "react";
import { getPosts } from "../../../../data-access-layer/posts-access-object";
import { useCookies } from "react-cookie";
import { Button, Modal } from "../../../ui/atoms";
import PostListItem from "../post-list-items/post-list-item";
import CreatePostComponent from "../post-details/create-post-component";

const PostsListComponent = () => {
  const [cookies] = useCookies(["jwt_authorization"]);
  const [postsList, setPostsList] = useState([]);
  const [isCreatePostModalVisible, setIsCreatePostModalVisible] =
    useState(false);

  const handleCreatePost = () => {
    setIsCreatePostModalVisible(true);
  };

  const handleAbortCreatePost = () => {
    setIsCreatePostModalVisible(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = cookies.jwt_authorization;
        if (token) {
          const data = await getPosts(token);
          setPostsList(data.posts.rows);
          console.log("data.posts.rows", data.posts.rows);
        } else {
          console.error("JWT token is not available in cookies");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <>
      <div className="max-h-[94vh] w-full post-list-container bg-aloom-bg-dark-second p-5 rounded-2xl flex flex-col justify-between w-1/2">
        <div className=" overflow-y-scroll">
          {postsList.length > 0 ? (
            postsList.map((post, index) => (
              <PostListItem key={index} postContent={post} />
            ))
          ) : (
            <div>No posts available</div>
          )}
        </div>
        <div>
          <Button.IconButton
            icon="BsPlusCircle"
            iconOpposite="BsPlusCircleFill"
            onClick={handleCreatePost}
            size={32}
          />
          {isCreatePostModalVisible ? (
            <Modal.Base>
              <CreatePostComponent onClose={handleAbortCreatePost} />
            </Modal.Base>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PostsListComponent;
