import React from "react";

const ProductListSkeletonLoader = () => {
  return (
    <>
      <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200 animate-pulse">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
        </th>
        <td className="px-6 py-4">
          <div className="h-3 w-32 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-3 w-12 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="h-3 w-16 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="inline-flex space-x-1">
            <div className="h-6 w-9 bg-gray-300 rounded"></div>
            <div className="h-6 w-9 bg-gray-300 rounded"></div>
          </div>
        </td>
      </tr>

      <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200 animate-pulse">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
        </th>
        <td className="px-6 py-4">
          <div className="h-3 w-32 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-3 w-12 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="h-3 w-16 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="inline-flex space-x-1">
            <div className="h-6 w-9 bg-gray-300 rounded"></div>
            <div className="h-6 w-9 bg-gray-300 rounded"></div>
          </div>
        </td>
      </tr>

      <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200 animate-pulse">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
        </th>
        <td className="px-6 py-4">
          <div className="h-3 w-32 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-3 w-12 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="h-3 w-16 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="inline-flex space-x-1">
            <div className="h-6 w-9 bg-gray-300 rounded"></div>
            <div className="h-6 w-9 bg-gray-300 rounded"></div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductListSkeletonLoader;
