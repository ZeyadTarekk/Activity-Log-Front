import React, { useState } from "react";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [query, setQuery] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);
  const staticData = [
    {
      id: 1,
      object: "event",
      actor_id: "user_3VG74289PUA2",
      actor_name: "Ali Salah",
      group: "instatus.com",
      action: {
        id: "evt_action_PGTD81NCAOQ2",
        object: "event_action",
        name: "user.login_succeeded",
      },
      target_id: "user_DOKVD1U3L030",
      target_name: "ali@instatus.com",
      location: "105.40.62.95",
      occurred_at: "2022-01-05T14:31:13.607Z",
      metadata: {
        redirect: "/setup",
        description: "User login succeeded.",
        x_request_id: "req_W1Y13QOHMI5H",
      },
    },
    {
      id: 2,
      object: "event",
      actor_id: "user_3VG74289PUA2",
      actor_name: "Ali Salah",
      group: "instatus.com",
      action: {
        id: "evt_action_PGTD81NCAOQ2",
        object: "event_action",
        name: "user.login_succeeded",
      },
      target_id: "user_DOKVD1U3L030",
      target_name: "ali@instatus.com",
      location: "105.40.62.95",
      occurred_at: "2022-01-05T14:31:13.607Z",
      metadata: {
        redirect: "/setup",
        description: "User login succeeded.",
        x_request_id: "req_W1Y13QOHMI5H",
      },
    },
    {
      id: 3,
      object: "event",
      actor_id: "user_3VG74289PUA2",
      actor_name: "Ali Salah",
      group: "instatus.com",
      action: {
        id: "evt_action_PGTD81NCAOQ2",
        object: "event_action",
        name: "user.login_succeeded",
      },
      target_id: "user_DOKVD1U3L030",
      target_name: "ali@instatus.com",
      location: "105.40.62.95",
      occurred_at: "2022-01-05T14:31:13.607Z",
      metadata: {
        redirect: "/setup",
        description: "User login succeeded.",
        x_request_id: "req_W1Y13QOHMI5H",
      },
    },
  ];
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };
  const handleLoadMore = () => {
    // Logic to load more items
  };

  const handleRowClick = (item) => {
    setExpandedItem(expandedItem?.id === item.id ? null : item);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-3xl bg-white border border-gray-300 rounded-lg shadow-lg">
        <SearchBar query={query} setQuery={setQuery} />
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 text-custom-gray text-left">
                ACTOR
              </th>
              <th className="py-2 px-4 bg-gray-100 text-custom-gray text-left">
                ACTION
              </th>
              <th className="py-2 px-4 bg-gray-100 text-custom-gray text-left">
                DATE
              </th>
            </tr>
          </thead>
          <tbody>
            {staticData.map((item) => (
              <React.Fragment key={item.id}>
                {expandedItem?.id === item.id ? (
                  <tr>
                    <td colSpan="3" className="py-4 px-4">
                      <div className="bg-white border border-gray-300 rounded-lg p-4">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-gray-300">
                              <th className="py-2 px-2 text-left text-gray-400">ACTOR</th>
                              <th className="py-2 px-2 text-left text-gray-400">ACTION</th>
                              <th className="py-2 px-2 text-left text-gray-400">DATE</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white">
                              <td className="py-4 px-4">
                                <div>
                                  <span className="text-gray-400">Name </span>{" "}
                                  {item.actor_name}
                                </div>
                                <div>
                                  <span className="text-gray-400">Email </span>{" "}
                                  {item.group}
                                </div>
                                <div>
                                  <span className="text-gray-400">ID </span>{" "}
                                  {item.actor_id}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div>
                                  <span className="text-gray-400">Name </span>{" "}
                                  {item.action.name}
                                </div>
                                <div>
                                  <span className="text-gray-400">Email </span>{" "}
                                  {item.action.object}
                                </div>
                                <div>
                                  <span className="text-gray-400">ID </span>{" "}
                                  {item.action.id}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div>
                                  <span className="text-gray-400">Readable </span>{" "}
                                  {formatDate(item.occurred_at)}
                                </div>
                              </td>
                            </tr>
                            <tr className="border-gray-300">
                              <th className="py-2 px-2 text-left text-gray-400">METADATA</th>
                              <th className="py-2 px-2 text-left text-gray-400">TARGET</th>
                            </tr>
                            <tr className="bg-white">
                              <td className="py-4 px-4">
                                <div>
                                  <span className="text-gray-400">description </span>{" "}
                                  {item.metadata.description}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div>
                                  <span className="text-gray-400">Name </span>{" "}
                                  {item.target_name}
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
                    <td className="py-4 px-4">
                      <div className="relative pl-16">
                        <img
                          src={`https://via.placeholder.com/50?text=${item.actor_name}`}
                          alt={item.actor_name}
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full"
                        />
                        {item.actor_name}
                      </div>
                    </td>
                    <td className="py-4 px-4">{item.action.name}</td>
                    <td className="py-4 px-4">{formatDate(item.occurred_at)}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleLoadMore}
          className="w-full py-2 mt-4 bg-gray-100 text-gray-800 font-semibold rounded-b-lg border-t hover:bg-gray-300"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default App;