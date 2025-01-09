import { useState, useEffect } from "react";
import DefaultHomeTemplate from "../components/features/home-grid-layout/DefaultHomeTemplate";
import { Button, Modal } from "../components/ui/atoms";
import PostsListComponent from "../components/features/post/post-list/post-list-component";

const HomePage = ({ userProfile }) => {
  const [gridLayout, setGridLayout] = useState([]);
  const [widgetOptions] = useState(["Posts List", "Weather", "News", "Stocks"]); // Available widget types
  const [selectedWidgetIndex, setSelectedWidgetIndex] = useState(null); // Tracks the index of the widget to be added
  const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown visibility
  const [widgetTypeToAdd, setWidgetTypeToAdd] = useState(null); // Selected widget type for adding

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
    setShowDropdown(true); // Show the dropdown for selection
  };

  // Handle widget selection from the dropdown
  const handleSelectWidget = (widgetType) => {
    if (widgetOptions.includes(widgetType)) {
      const updatedLayout = [...gridLayout];
      updatedLayout[selectedWidgetIndex] = widgetType; // Add selected widget to the grid spot
      setGridLayout(updatedLayout); // Update state and trigger useEffect to save the new layout
      setShowDropdown(false); // Close the dropdown after selection
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
      // Render selected widget based on `widgetType`
      switch (widgetType) {
        case "Posts List":
          return (
            <div className="widget bg-blue-500 p-4 rounded-md col-span-2 row-span-2">
              <PostsListComponent />
              <button
                onClick={() => handleRemoveWidget(index)} // Remove widget on button click
                className="bg-red-500 text-white p-1 rounded mt-2"
              >
                Remove
              </button>
            </div>
          );
        case "Weather":
          return (
            <div className="widget bg-blue-500 p-4 rounded-md">
              Weather
              <button
                onClick={() => handleRemoveWidget(index)} // Remove widget on button click
                className="bg-red-500 text-white p-1 rounded mt-2"
              >
                Remove
              </button>
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
    // Render an "Add Widget" button if the spot is empty
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
          {/* 4x4 grid layout */}
          <div className="px-6 h-[94vh] grid gap-4 grid-cols-4 grid-rows-4">
            {gridLayout.map((widgetType, index) => {
              // Skip indices that are covered by a multi-cell widget like "Posts List"
              const alreadyRendered = gridLayout
                .slice(0, index)
                .some((type, idx) => {
                  if (type === "Posts List") {
                    // Check if this index is part of the span of a "Posts List" widget
                    const startIndex = idx; // Starting index of the Posts List
                    const coveredIndices = [
                      startIndex,
                      startIndex + 1,
                      startIndex + 4,
                      startIndex + 5,
                    ]; // Indices it spans
                    return coveredIndices.includes(index);
                  }
                  return false;
                });

              if (alreadyRendered) return null; // Skip rendering duplicate cells

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

              // Render single-cell widgets
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

          {/* Dropdown for selecting a widget */}
          {showDropdown && (
            <Modal.Base>
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
          )}
        </div>
      ) : (
        <DefaultHomeTemplate />
      )}
    </section>
  );
};

export default HomePage;
