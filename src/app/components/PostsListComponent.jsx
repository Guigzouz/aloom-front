import { useEffect, useState } from "react";
import { getPosts } from "../data-access-layer/posts-access-object";
import { useCookies } from "react-cookie";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCommentIcon from "@mui/icons-material/AddComment";
import MoodIcon from "@mui/icons-material/Mood";

const PostsListComponent = () => {
  const [cookies] = useCookies(["jwt_authorization"]);
  const [postsList, setPostsList] = useState([]);

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
      <div className="post-list-container bg-aloom-bg-dark-second p-5 rounded-2xl flex flex-col justify-between w-auto">
        <div className="max-h-[22rem] overflow-y-scroll">
          {postsList.length > 0 ? (
            postsList.map((post, index) => (
              <div
                key={index}
                className="text-white post-container p-3 border border-aloom-orange rounded-2xl mb-5"
              >
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
                      <span>{post.author.firstName}</span>
                      <span>{post.author.lastName}</span>
                    </div>

                    <div className="content-container max-w-md text-start">
                      {post.content}
                    </div>
                  </div>
                </div>

                <div className="interaction-container flex mt-2 gap-2">
                  <AddCommentIcon
                    sx={{ backgroundColor: "aloom-disabled-grey" }}
                  ></AddCommentIcon>
                  <MoodIcon sx={{}}></MoodIcon>
                </div>
              </div> // Render each post title or other post data
            ))
          ) : (
            <div>No posts available</div>
          )}
        </div>
        <div className="cta bg-aloom-orange rounded-2xl p-2 text font-bold uppercase cursor-pointer">
          <span className="text-white">Voir votre fil d'actualité</span>
        </div>
      </div>
    </>
  );
};

export default PostsListComponent;
