import React, { useRef, useState } from "react";
import { HiOutlineTrash, HiSearch, HiX } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useSWR from "swr";
import VoucherListRow from "./VoucherListRow";
import { debounce } from "lodash";

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherList = () => {
  const [search, setSearch] = useState("");

  const searchInput = useRef("");

  const { data, error, isLoading } = useSWR(
    search
      ? import.meta.env.VITE_API_URL + `/vouchers?voucher_id_like=${search}`
      : import.meta.env.VITE_API_URL + "/vouchers",
    fetcher
  );

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  const handleClearSearch = () => {
    setSearch("");
    searchInput.current.value = "";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <HiSearch className="text-gray-500" />
          </div>
          <input
            onChange={handleSearch}
            ref={searchInput}
            type="text"
            id="simple-search"
            className="bg-gray-50 focus-visible:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full ps-10 p-2.5  "
            placeholder="Search Voucher"
          />
          {search && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
              <HiX className="text-red-500 active:scale-95 hover:scale-105" />
            </button>
          )}
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
                Vocher ID
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
            {isLoading ? (
              <tr className="odd:bg-white  even:bg-gray-50  border-b border-gray-200 hidden last:table-row">
              <td colSpan={5} className="px-6 py-4 text-center">
                Loading ...
              </td>
            </tr>
            ) : (
              data.map((voucher, index) => (
                <VoucherListRow key={index} voucher={voucher} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherList;
