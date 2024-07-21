const FetchingError = () => {
  return (
    <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">Something went wrong.</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
      </div>
    </div>
  );
};

export default FetchingError;
