import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faFileExport } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ query, setQuery, onSearch, onExport }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  const handleFilter = () => {
    console.log("Filter button clicked");
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
        <button
          type="button"
          onClick={handleFilter}
          className="bg-custom-gray-light-1 absolute right-20 top-1/2 transform -translate-y-1/2 border border-gray-300 text-gray-900 p-2"
        >
          <FontAwesomeIcon icon={faFilter} />
          Filter
        </button>
        <button
          type="button"
          onClick={onExport}
          className="bg-custom-gray-light-1 absolute right-0 top-1/2 transform -translate-y-1/2 border border-gray-300 text-gray-900 p-2"
        >
          <FontAwesomeIcon icon={faFileExport} />
          Export
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
