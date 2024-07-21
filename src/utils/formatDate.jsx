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

export default formatDate;
