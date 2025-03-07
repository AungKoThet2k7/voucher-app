import React from "react";
import { HiOutlineTrash, HiSearch } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import { Link } from "react-router-dom";

const VoucherList = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <HiSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 focus-visible:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full ps-10 p-2.5  "
            placeholder="Search Voucher"
          />
        </div>
        <Link
        to={"/sale"}
          className="p-2.5 ms-2 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-500 hover:bg-sky-700"
        >
          Create Sale
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Customer name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Create at
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white  even:bg-gray-50  border-b border-gray-200 hidden last:table-row">
              <td colSpan={5} className="px-6 py-4 text-center">
                There is no Voucher yet
              </td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                1
              </th>
              <td className="px-6 py-4">Kyaw Kyaw</td>
              <td className="px-6 py-4">kyaw@gmail.com</td>
              <td className="px-6 py-4">
                <p>{new Date().toLocaleDateString()}</p>
                <p>{new Date().toLocaleTimeString()}</p>
              </td>
              <td className="px-6 py-4 text-end">
                <div
                  className="inline-flex shadow-xs border border-gray-500"
                  role="group"
                >
                  <button
                    type="button"
                    className="py-2 px-3 text-sm font-medium text-sky-500 bg-white hover:bg-gray-200 hover:text-sky-700"
                  >
                    <HiOutlinePencil />
                  </button>
                  <button
                    type="button"
                    className="py-2 px-3 text-sm font-medium text-red-500 bg-white hover:bg-gray-200 hover:text-red-700"
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherList;
