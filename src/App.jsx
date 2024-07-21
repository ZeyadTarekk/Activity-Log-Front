import { useState, useCallback, useEffect } from "react";
import useSWR from "swr";
import SearchBar from "./components/SearchBar";
import TableRow from "./components/TableRow";
import TableHeader from "./components/TableHeader";
import LoadingRow from "./components/LoadingRow";
import FetchingError from "./components/FetchingError";

import fetcher from "./utils/fetcher";
import { exportDataToCSV } from "./utils/csvUtils";

const App = () => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [expandedItem, setExpandedItem] = useState(null);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const take = 5;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const buildEndpoint = () => {
    let url = `https://activitylog-zeyad.azurewebsites.net/events?skip=${skip}&take=${take}`;
    if (searchTerm) {
      url += `&name=${encodeURIComponent(searchTerm)}`;
    }
    if (filters.actorId) {
      url += `&actorId=${encodeURIComponent(filters.actorId)}`;
    }
    if (filters.targetId) {
      url += `&targetId=${encodeURIComponent(filters.targetId)}`;
    }
    if (filters.actionId) {
      url += `&actionId=${encodeURIComponent(filters.actionId)}`;
    }
    return url;
  };

  const endpoint = buildEndpoint();

  const { data: fetchedData, error } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.length < take) {
        setHasMoreData(false);
      }
      setData((prevData) => [...prevData, ...fetchedData]);
    }
  }, [fetchedData]);

  const handleSearch = useCallback(() => {
    setData([]);
    setSkip(0);
    setHasMoreData(true);
    setSearchTerm(query);
  }, [query]);

  const handleApplyFilter = useCallback((newFilters) => {
    setData([]);
    setSkip(0);
    setHasMoreData(true);
    setFilters(newFilters);
  }, []);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    setSkip((prevSkip) => prevSkip + take);
    setIsLoadingMore(false);
  };

  if (error) {
    return <FetchingError />;
  }

  const handleRowClick = (item) => {
    setExpandedItem(expandedItem?.id === item.id ? null : item);
  };

  const handleExport = () => {
    if (data && data.length > 0) {
      const csvData = data.map((item) => ({
        ActorName: item.actorName,
        ActorEmail: item.actorName,
        ActorId: item.actorId,
        ActionName: item.action.name,
        ActionObject: item.action.object,
        ActionId: item.action.id,
        OccurredAt: item.occurredAt,
        Redirect: item.metadata.redirect,
        Description: item.metadata.description,
        RequestId: item.metadata.x_request_id,
        TargetName: item.targetName,
        TargetId: item.targetId,
      }));

      exportDataToCSV(csvData, "data_export.csv");
    } else {
      alert("No data to export");
    }
  };

  if (data)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="overflow-y-auto w-full max-w-5xl min-h-[80vh] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            onExport={handleExport}
            onApplyFilter={handleApplyFilter}
          />
          <div className="overflow-y-auto max-h-[65vh] flex-grow overflow-auto">
            <table className="min-w-full bg-white border-collapse">
              <TableHeader />
              <tbody>
                {data.map((item) => (
                  <TableRow
                    key={item.id}
                    item={item}
                    onClick={handleRowClick}
                    isExpanded={expandedItem?.id === item.id}
                  />
                ))}
                {hasMoreData && <LoadingRow />}
              </tbody>
            </table>
          </div>
          {hasMoreData && (
            <button
              onClick={handleLoadMore}
              className="w-full py-3 mt-2 bg-custom-gray-light text-gray-800 font-semibold rounded-b-lg border-t hover:bg-gray-300"
              disabled={isLoadingMore}
            >
              {isLoadingMore ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    );
};

export default App;
