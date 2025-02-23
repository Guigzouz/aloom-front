import VideogameListComponent from "../components/features/videogames/videogame-list/videogame-list-component";

const SocialPage = () => {
  return (
    <section className="main-page-section flex px-8">
      {" "}
      <VideogameListComponent isReducedView={false} />
    </section>
  );
};

export default SocialPage;
