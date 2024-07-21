import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faFileExport } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ query, setQuery, onSearch, onExport, onApplyFilter }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [actorId, setActorId] = useState("");
  const [targetId, setTargetId] = useState("");
  const [actionId, setActionId] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleApplyFilter = () => {
    onApplyFilter({ actorId, targetId, actionId });
  };

  return (
    <div className="relative">
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
      {showFilter && (
        <div className="absolute right-20 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-300">
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="actor-id"
            >
              Actor ID
            </label>
            <input
              type="text"
              id="actor-id"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={actorId}
              onChange={(e) => setActorId(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="target-id"
            >
              Target ID
            </label>
            <input
              type="text"
              id="target-id"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="action-id"
            >
              Action ID
            </label>
            <input
              type="text"
              id="action-id"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={actionId}
              onChange={(e) => setActionId(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleApplyFilter}
            className="w-full py-3 mt-2 bg-custom-gray-light text-gray-800 font-semibold rounded-b-lg border-t hover:bg-gray-300"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};

export default SearchBar;
