const PostsPage = ({ userProfile }) => {
  return (
    <section className="main-page-section grid grid-rows-2">
      {userProfile ? (
        <h3 className="text-white">
          How's it going, {userProfile.firstName}? welcome to the posts page
        </h3>
      ) : (
        <h3 className="text-white">Welcome! Please log in</h3>
      )}
      <div className="flex gap-4 px-8"></div>
    </section>
  );
};

export default PostsPage;
