import { useNavigate } from "react-router-dom";
import { Button } from "../../atoms";

const ToolbarComponent = () => {
  const navigate = useNavigate();

  const handleImageClick = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  return (
    <>
      <section className="aloom-main-toolbar bg-aloom-bg-dark-second h-full w-24 rounded-3xl">
        <div className="flex flex-col items-center justify-between h-full p-5">
          <div>
            <img
              src="src/assets/aloom-panda.png"
              alt="Panda"
              onClick={() => handleImageClick("/")}
              style={{ cursor: "pointer" }} // Add a pointer cursor to indicate it's clickable
            />
          </div>
          <div>
            <Button.IconButton
              icon="BsFillChatSquareTextFill"
              onClick={() => handleImageClick("/posts")}
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
