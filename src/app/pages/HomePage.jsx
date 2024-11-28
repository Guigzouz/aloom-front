import { useEffect, useState } from "react";
import DefaultHomeTemplate from "../components/templates/DefaultHomeTemplate";

const HomePage = ({ userProfile }) => {
  const [gridLayout, setGridLayout] = useState([]);
  const [widgetOptions] = useState(["Weather", "News", "Stocks"]); // Available widget types

  // Load layout from localStorage on initial load
  useEffect(() => {
    const savedLayout =
      JSON.parse(localStorage.getItem("homepageLayout")) || [];
    setGridLayout(savedLayout.length ? savedLayout : Array(9).fill(null));
  }, []);

  // Save layout to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("homepageLayout", JSON.stringify(gridLayout));
  }, [gridLayout]);

  // Handle adding a widget to a specific position
  const handleAddWidget = (index) => {
    const widgetType = prompt(`Choose a widget: ${widgetOptions.join(", ")}`);
    if (widgetOptions.includes(widgetType)) {
      const updatedLayout = [...gridLayout];
      updatedLayout[index] = widgetType;
      setGridLayout(updatedLayout);
    } else {
      alert("Invalid widget type.");
    }
  };

  const renderWidget = (widgetType, index) => {
    if (widgetType) {
      // Render selected widget based on `widgetType`
      switch (widgetType) {
        case "Weather":
          return (
            <div className="widget bg-blue-500 p-4 rounded-md">Weather</div>
          );
        case "News":
          return <div className="widget bg-red-500 p-4 rounded-md">News</div>;
        case "Stocks":
          return (
            <div className="widget bg-green-500 p-4 rounded-md">Stocks</div>
          );
        default:
          return (
            <div className="widget bg-gray-500 p-4 rounded-md">Unknown</div>
          );
      }
    }
    // Render an "Add Widget" button if the spot is empty
    return (
      <button
        onClick={() => handleAddWidget(index)}
        className="bg-gray-300 text-black p-2 rounded-md w-full h-full"
      >
        Add Widget
      </button>
    );
  };

  return (
    <section className="main-page-section border border-white">
      {userProfile ? (
        <div>
          <h3 className="text-white">
            How's it going, {userProfile.firstName}?
          </h3>
          {/* Responsive grid layout */}
          <div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-3 grid-rows-3">
            {gridLayout.map((widgetType, index) => (
              <div
                key={index}
                className="p-4 border border-gray-600 rounded-md"
              >
                {renderWidget(widgetType, index)}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <DefaultHomeTemplate />
      )}
    </section>
  );
};

export default HomePage;
