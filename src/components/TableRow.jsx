import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import formatDate from "../utils/formatDate";
import PropTypes from "prop-types";

const TableRow = ({ item, onClick, isExpanded }) => {
  return (
    <>
      {isExpanded ? (
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
        <tr className="bg-white cursor-pointer" onClick={() => onClick(item)}>
          <td className="py-3 px-4">
            <div className="relative pl-10" style={{ fontSize: "13px" }}>
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
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-500" />
          </td>
        </tr>
      )}
    </>
  );
};

TableRow.propTypes = {
  item: PropTypes.shape({
    actorName: PropTypes.string.isRequired,
    // actorEmail: PropTypes.string.isRequired,
    actorId: PropTypes.string.isRequired,
    action: PropTypes.shape({
      name: PropTypes.string.isRequired,
      object: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
    occurredAt: PropTypes.string.isRequired,
    metadata: PropTypes.shape({
      redirect: PropTypes.string,
      description: PropTypes.string,
      x_request_id: PropTypes.string,
    }).isRequired,
    targetName: PropTypes.string.isRequired,
    targetId: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default TableRow;
