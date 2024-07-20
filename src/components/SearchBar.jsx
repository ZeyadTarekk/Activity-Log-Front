
const SearchBar = ({ query, setQuery }) => {
  return (
    <form className="bg-gray-100 flex items-center p-4">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Search name, email or action..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
      </div>
    </form>
  );
};

export default SearchBar;
