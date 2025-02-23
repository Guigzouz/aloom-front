import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getVideogames } from "../../../../data-access-layer/videogames-access-object";
import {
  LargeVideogameCard,
  SmallVideogameCard,
} from "../../../ui/molecules/Cards";
import { Modal } from "../../../ui/atoms";
import { useModal } from "../../../../providers/ModalProvider";
import VideogameChooseSearchtype from "../videogame-details/videogame-choose-searchtype";

const VideogameListComponent = ({ isReducedView }) => {
  const [cookies] = useCookies(["jwt_authorization"]);
  const [videogamesList, setVideogamesList] = useState([]);
  const { openModal, closeModal, activeModal } = useModal();

  useEffect(() => {
    const fetchVideogames = async () => {
      try {
        const token = cookies.jwt_authorization;
        if (token) {
          const data = await getVideogames(token);
          setVideogamesList(data.videogames);
        } else {
          console.error("JWT token is not available in cookies");
        }
      } catch (error) {
        console.error("Error fetching videogames:", error);
      }
    };

    fetchVideogames();
  }, [cookies]);

  const handleClick = (id) => {
    openModal(`videogameModal-${id}`);
  };

  return (
    <div className="max-h-[94vh] w-full bg-aloom-bg-dark-second p-5 rounded-2xl flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {videogamesList.slice(0, 2).map((game) => (
          <LargeVideogameCard
            key={game.id}
            configs={game}
            onSelect={() => handleClick(game.id)}
          />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {videogamesList.slice(2).map((game) => (
          <SmallVideogameCard
            key={game.id}
            configs={game}
            onSelect={() => handleClick(game.id)}
          />
        ))}
      </div>

      {videogamesList.map(
        (game) =>
          activeModal === `videogameModal-${game.id}` && (
            <Modal.Base
              key={game.id}
              modalId={`videogameModal-${game.id}`}
              onClose={closeModal}
            >
              <VideogameChooseSearchtype game={game} />
            </Modal.Base>
          )
      )}
    </div>
  );
};

export default VideogameListComponent;
