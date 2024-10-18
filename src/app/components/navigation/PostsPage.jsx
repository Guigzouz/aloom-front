import PostDetailsComponent from "../PostDetailsComponent";
import PostsListComponent from "../PostsListComponent";

const PostsPage = ({ userProfile }) => {
  return (
    <section className="main-page-section flex px-8">
      <PostsListComponent />
      <PostDetailsComponent />
    </section>
  );
};

export default PostsPage;
