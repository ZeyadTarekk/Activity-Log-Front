const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <form className="bg-custom-gray-light-1 flex items-center p-4">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full flex items-center">
        <input
          type="text"
          id="simple-search"
          className="bg-custom-gray-light-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Search name, email or action..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          required
        />
      </div>
    </form>
  );
};

export default SearchBar;
