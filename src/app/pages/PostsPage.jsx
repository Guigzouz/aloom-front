import PostsListComponent from "../components/features/post/post-list/post-list-component";

const PostsPage = () => {
  return (
    <section className="main-page-section flex px-8">
      <PostsListComponent isReducedView={false} />
    </section>
  );
};

export default PostsPage;
