import React from "react";

const NoData: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h2 className="mt-6 text-lg font-semibold text-gray-700">
        No Data Found
      </h2>
      <p className="mt-2 text-gray-500">
        We couldn't find any realtors. Please enter the zip code to search for realtors.
      </p>
    </div>
  );
};

export default NoData;
