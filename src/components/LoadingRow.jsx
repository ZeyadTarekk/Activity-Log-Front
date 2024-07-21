const LoadingRow = () => {
  return (
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
  );
};

export default LoadingRow;
