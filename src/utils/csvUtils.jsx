const convertToCSV = (data) => {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const rows = data.map((item) =>
    headers.map((header) => JSON.stringify(item[header], replacer)).join(",")
  );

  return [headers.join(","), ...rows].join("\r\n");
};

const replacer = (key, value) => (value === null ? "" : value);

export const exportDataToCSV = (data, filename = "data_export.csv") => {
  const csv = convertToCSV(data);
  if (!csv) return;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
