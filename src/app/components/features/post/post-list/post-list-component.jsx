import { useEffect, useState } from "react";
import { getPosts } from "../../../../data-access-layer/posts-access-object";
import { useCookies } from "react-cookie";
import PostListItem from "../post-list-items/post-list-item";
import CreatePostComponent from "../post-details/create-post-component";

const PostsListComponent = ({ isReducedView }) => {
  const [cookies] = useCookies(["jwt_authorization"]);
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = cookies.jwt_authorization;
        if (token) {
          const data = await getPosts(token);
          setPostsList(data.posts);
        } else {
          console.error("JWT token is not available in cookies");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, []); // Empty dependency array to ensure it runs only once

  const refreshListComponent = async () => {
    try {
      const token = cookies.jwt_authorization;
      if (token) {
        const data = await getPosts(token);
        setPostsList(data.posts);
      } else {
        console.error("JWT token is not available in cookies");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <>
      <div className="max-h-[94vh] w-full post-list-container bg-aloom-bg-dark-second p-5 rounded-2xl flex flex-col justify-between w-1/2">
        <div>
          <CreatePostComponent
            displayCloseBtn={false}
            onPostCreated={refreshListComponent}
          />
        </div>
        <div
          className={`overflow-y-scroll flex flex-col gap-4 ${
            isReducedView ? "max-h-[180px]" : "max-h-[none]"
          }`} // Apply max-h-[180px] when isReducedView is true
        >
          {postsList.length > 0 ? (
            postsList.map((post, index) => (
              <PostListItem key={index} postContent={post} />
            ))
          ) : (
            <div>No posts available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostsListComponent;
