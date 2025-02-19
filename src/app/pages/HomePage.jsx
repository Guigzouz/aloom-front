import { useState, useEffect } from "react";
import DefaultHomeTemplate from "../components/features/home-grid-layout/DefaultHomeTemplate";
import { Button, Modal } from "../components/ui/atoms";
import PostsListComponent from "../components/features/post/post-list/post-list-component";
import { useModal } from "../providers/ModalProvider";

const HomePage = ({ userProfile }) => {
  const [gridLayout, setGridLayout] = useState([]);
  const [widgetOptions] = useState(["Posts List", "Weather", "News", "Stocks"]);
  const [selectedWidgetIndex, setSelectedWidgetIndex] = useState(null);

  const { openModal, closeModal } = useModal(); // Destructure useModal context

  // Load layout from localStorage on initial load
  useEffect(() => {
    const savedLayout =
      JSON.parse(localStorage.getItem("homepageLayout")) || [];
    setGridLayout(savedLayout.length ? savedLayout : Array(16).fill(null)); // Default to 16 empty spots for 4x4 grid
  }, []);

  // Save layout to localStorage whenever it changes
  useEffect(() => {
    if (gridLayout.length > 0) {
      localStorage.setItem("homepageLayout", JSON.stringify(gridLayout)); // Store grid layout in localStorage
    }
  }, [gridLayout]);

  // Handle adding a widget to a specific position
  const handleAddWidget = (index) => {
    setSelectedWidgetIndex(index); // Set the index of the spot where the widget will be added
    openModal("widget-selection-modal"); // Open modal for widget selection
  };

  // Handle widget selection from the dropdown modal
  const handleSelectWidget = (widgetType) => {
    if (widgetOptions.includes(widgetType)) {
      const updatedLayout = [...gridLayout];
      updatedLayout[selectedWidgetIndex] = widgetType; // Add selected widget to the grid spot
      setGridLayout(updatedLayout); // Update state and trigger useEffect to save the new layout
      closeModal("widget-selection-modal"); // Close the modal after selection
    } else {
      alert("Invalid widget type.");
    }
  };

  // Handle removing a widget from a specific position
  const handleRemoveWidget = (index) => {
    const updatedLayout = [...gridLayout];
    updatedLayout[index] = null; // Remove the widget by setting the spot to null
    setGridLayout(updatedLayout); // Update state and trigger useEffect to save the new layout
  };

  const renderWidget = (widgetType, index) => {
    if (widgetType) {
      switch (widgetType) {
        case "Posts List":
          return (
            <div className="widget w-full overflow-hidden bg-blue-500 p-4 rounded-md col-span-2 row-span-2 relative">
              <Button.IconButton
                icon="BsXSquare"
                iconOpposite="BsXSquareFill"
                onClick={() => handleRemoveWidget(index)} // Remove widget on button click
                className="absolute top-2 right-2 z-10"
              />
              <div className="relative z-0">
                <PostsListComponent isReducedView={true} />
              </div>
            </div>
          );
        case "Weather":
          return (
            <div className="widget bg-blue-500 p-4 rounded-md relative">
              Weather
              <Button.IconButton
                icon="BsXSquare"
                iconOpposite="BsXSquareFill"
                onClick={() => handleRemoveWidget(index)} // Remove widget on button click
                className="absolute top-2 right-2"
              />
            </div>
          );
        case "News":
          return (
            <div className="widget bg-red-500 p-4 rounded-md">
              News
              <button
                onClick={() => handleRemoveWidget(index)} // Remove widget on button click
                className="bg-red-500 text-white p-1 rounded mt-2"
              >
                Remove
              </button>
            </div>
          );
        case "Stocks":
          return (
            <div className="widget bg-green-500 p-4 rounded-md">
              Stocks
              <button
                onClick={() => handleRemoveWidget(index)} // Remove widget on button click
                className="bg-red-500 text-white p-1 rounded mt-2"
              >
                Remove
              </button>
            </div>
          );
        default:
          return (
            <div className="widget bg-gray-500 p-4 rounded-md">
              Unknown
              <button
                onClick={() => handleRemoveWidget(index)} // Remove widget on button click
                className="bg-red-500 text-white p-1 rounded mt-2"
              >
                Remove
              </button>
            </div>
          );
      }
    }
    return (
      <Button.IconButton
        icon="BsFillPlusSquareFill"
        onClick={() => handleAddWidget(index)}
        size={40}
      />
    );
  };

  return (
    <section className="main-page-section">
      {userProfile ? (
        <div className="">
          <div className="px-6 h-[94vh] grid gap-4 grid-cols-4 grid-rows-4">
            {gridLayout.map((widgetType, index) => {
              const alreadyRendered = gridLayout
                .slice(0, index)
                .some((type, idx) => {
                  if (type === "Posts List") {
                    const startIndex = idx;
                    const coveredIndices = [
                      startIndex,
                      startIndex + 1,
                      startIndex + 4,
                      startIndex + 5,
                    ];
                    return coveredIndices.includes(index);
                  }
                  return false;
                });

              if (alreadyRendered) return null;

              if (widgetType === "Posts List") {
                return (
                  <div
                    key={index}
                    style={{ gridColumn: "span 2", gridRow: "span 2" }}
                    className="p-4 flex justify-center border border-gray-600 rounded-md"
                  >
                    {renderWidget(widgetType, index)}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className="p-4 flex justify-center border border-gray-600 rounded-md"
                >
                  {renderWidget(widgetType, index)}
                </div>
              );
            })}
          </div>

          {/* Widget Selection Modal */}
          <Modal.Base modalId="widget-selection-modal" onClose={closeModal}>
            <div className="absolute bg-white border border-gray-500 rounded-md p-2 mt-2 shadow-lg">
              <h4 className="text-black mb-2">Select Widget</h4>
              <ul>
                {widgetOptions.map((option, index) => (
                  <li
                    key={index}
                    className="cursor-pointer p-1 hover:bg-gray-200"
                    onClick={() => handleSelectWidget(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </Modal.Base>
        </div>
      ) : (
        <DefaultHomeTemplate />
      )}
    </section>
  );
};

export default HomePage;
