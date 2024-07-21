import React, { useState, useCallback, useEffect } from "react";
import useSWR from "swr";
import SearchBar from "./components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const fetcher = (url) => fetch(url).then((res) => res.json());

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
  }

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

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

      const csvContent = [
        [
          "Actor Name",
          "Actor Email",
          "Actor ID",
          "Action Name",
          "Action Object",
          "Action ID",
          "Occurred At",
          "Redirect",
          "Description",
          "Request Id",
          "Target Name",
          "Target Id",
        ],
        ...csvData.map((item) => [
          item.ActorName,
          item.ActorEmail,
          item.ActorId,
          item.ActionName,
          item.ActionObject,
          item.ActionId,
          item.OccurredAt,
          item.Redirect,
          item.Description,
          item.RequestId,
          item.TargetName,
          item.TargetId,
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "data_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
              <thead>
                <tr className="py-1 bg-custom-gray-light-1 text-custom-gray text-left">
                  <th className="px-4">ACTOR</th>
                  <th className="px-4">ACTION</th>
                  <th className="px-4">DATE</th>
                  <th className="px-4"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <React.Fragment key={item.id}>
                    {expandedItem?.id === item.id ? (
                      <tr>
                        <td colSpan="4" className="p-0">
                          <div className="bg-white border border-gray-300 rounded-lg p-2 m-2">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="border-gray-300">
                                  <th className="py-1 px-1 text-left text-custom-gray-light-2 text-sm">
                                    ACTOR
                                  </th>
                                  <th className="py-1 px-1 text-left text-custom-gray-light-2 text-sm">
                                    ACTION
                                  </th>
                                  <th className="py-1 px-1 text-left text-custom-gray-light-2 text-sm">
                                    DATE
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white">
                                  <td className="py-0.5 px-0.5">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          Name
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {item.actorName}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          Email
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {item.actorName}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          ID
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {item.actorId}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-0.5 px-0.5">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          Name
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {item.action.name}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          Object
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {item.action.object}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          ID
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {item.action.id}
                                        </span>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="py-0.5 px-0.5">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          Readable
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {formatDate(item.occurredAt)}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>

                                <tr className="border-gray-300">
                                  <th className="py-1 px-1 text-left text-custom-gray-light-2 text-sm">
                                    METADATA
                                  </th>
                                  <th className="py-1 px-1 text-left text-custom-gray-light-2 text-sm">
                                    TARGET
                                  </th>
                                </tr>

                                <tr className="bg-white">
                                  <td className="py-0.5 px-0.5">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          Redirect
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {item.metadata.redirect}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          Description
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {item.metadata.description}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          Request ID
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {item.metadata.x_request_id}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-0.5 px-0.5">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          Name
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {item.targetName}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span
                                          className="text-custom-gray-light-2 text-sm"
                                          style={{ flexBasis: "5rem" }}
                                        >
                                          ID
                                        </span>
                                        <span
                                          className="text-custom-black text-sm"
                                          style={{ flexGrow: 1 }}
                                        >
                                          {item.targetId}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr
                        className="bg-white cursor-pointer"
                        onClick={() => handleRowClick(item)}
                      >
                        <td className="py-3 px-4">
                          <div
                            className="relative pl-10"
                            style={{ fontSize: "13px" }}
                          >
                            <img
                              src={`https://via.placeholder.com/30?text=${item.actorName.charAt(
                                0
                              )}`}
                              alt={item.actorName}
                              className="text-custom-black text-sm absolute left-0 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full"
                            />
                            {item.actorName}
                          </div>
                        </td>
                        <td
                          style={{ fontSize: "13px" }}
                          className="py-3 px-4 text-custom-black"
                        >
                          {item.action.name}
                        </td>
                        <td
                          style={{ fontSize: "13px" }}
                          className="py-3 px-4 text-custom-black"
                        >
                          {formatDate(item.occurredAt)}
                        </td>
                        <td className="py-3 px-4 text-custom-black text-center">
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="text-gray-500"
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {hasMoreData && (
                  <tr className="bg-white cursor-pointer">
                    <td className="py-3 px-4 flex items-center">
                      <div className="rounded-full bg-slate-200 h-7 w-7"></div>
                      <div className="ml-3 w-full">
                        <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-custom-black">
                      <div className="h-2 bg-slate-200 rounded w-full"></div>
                    </td>
                    <td className="py-3 px-4 text-custom-black">
                      <div className="h-2 bg-slate-200 rounded w-full"></div>
                    </td>
                  </tr>
                )}
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
