import { useNavigate } from "react-router-dom";
import { Button } from "../../atoms";

const ToolbarComponent = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    console.log("i go through imageclick handler");
    navigate("/");
  };

  return (
    <>
      <section className="aloom-main-toolbar bg-aloom-bg-dark-second h-full w-24 rounded-3xl">
        <div className="flex flex-col items-center justify-between h-full p-5">
          <div>
            <img
              src="src/assets/aloom-panda.png"
              alt="Panda"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }} // Add a pointer cursor to indicate it's clickable
            />
          </div>
          <div>
            <Button.IconButton
              icon="BsFillChatSquareTextFill"
              onClick={() => handleImageClick()}
              size={32}
              color="white"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ToolbarComponent;
