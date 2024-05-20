const ToolbarComponent = () => {
  return (
    <>
      <section className="aloom-main-toolbar bg-aloom-bg-dark-second h-full w-24 rounded-3xl">
        <div className="flex flex-col items-center justify-between h-full p-5">
          {/* either user pfp or loginIcon */}
          <div>
            <img src="src/assets/aloom-panda.png" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ToolbarComponent;
