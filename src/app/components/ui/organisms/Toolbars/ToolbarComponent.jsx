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
        <div className="flex flex-col items-center h-full p-5">
          <div>
            <img
              src="/assets/aloom-panda.png"
              alt="Panda"
              onClick={() => handleImageClick("/")}
              style={{ cursor: "pointer" }} // Add a pointer cursor to indicate it's clickable
            />
          </div>
          <div className="flex flex-col gap-5 pb-2 pt-5 items-center justify-center">
            <Button.IconButton
              icon="BsPersonAdd"
              iconOpposite="BsPersonFillAdd"
              onClick={() => handleImageClick("/social")}
              size={40}
              color="white"
            />
            <Button.IconButton
              icon="BsPeople"
              iconOpposite="BsPeopleFill"
              onClick={() => handleImageClick("/groups")}
              size={36}
              color="white"
            />
            <Button.IconButton
              icon="BsGlobe2"
              iconOpposite="BsGlobeEuropeAfrica"
              onClick={() => handleImageClick("/posts")}
              size={38}
              color="white"
            />
            <Button.IconButton
              icon="BsGear"
              iconOpposite="BsGearFill"
              onClick={() => handleImageClick("/settings")}
              size={38}
              color="white"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ToolbarComponent;
