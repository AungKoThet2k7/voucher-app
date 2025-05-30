import React, { useRef, useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import VoucherListRow from "./VoucherListRow";
import { debounce } from "lodash";
import reactUseCookie from "react-use-cookie";
import Pagination from "./Pagination";

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherList = () => {
  const [token] = reactUseCookie("token");

  const location = useLocation();

  const [params, setParams] = useSearchParams();

  const fetcher = (url) =>
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + "/vouchers" + location.search
  );

  const searchInput = useRef("");

  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  const handleSearch = debounce((e) => {
    if (e.target.value) {
      setParams({ q: e.target.value });
      setFetchUrl(
        import.meta.env.VITE_API_URL + `/vouchers?q=${e.target.value}`
      );
    }else{
      setParams({});
      setFetchUrl(import.meta.env.VITE_API_URL + "/vouchers");
    }
  }, 500);

  const updateFetchUrl = (url) => {
    const currentUrl = new URL(url);
    const newSearchParams = new URLSearchParams(currentUrl.search);

    const paramsObj = Object.fromEntries(newSearchParams);

    setParams(paramsObj);
    setFetchUrl(url);
  };
  const handleClearSearch = () => {
    setParams({});
    setFetchUrl(import.meta.env.VITE_API_URL + "/vouchers");
    searchInput.current.value = "";
  };

  if (isLoading) return <div>loading...</div>;
  console.log(data);

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

          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            <HiX className="text-red-500 active:scale-95 hover:scale-105" />
          </button>
        </div>
        <Link
          to={"/dashboard/sale"}
          className="p-2.5 ms-2 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-500 hover:bg-sky-700"
        >
          Create Sale
        </Link>
      </div>

      <div className="relative overflow-x-auto rounded-lg shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Vocher ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Create at
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white  even:bg-gray-50  border-b border-gray-200 hidden last:table-row">
              <td colSpan={6} className="px-6 py-4 text-center">
                There is no Voucher yet
              </td>
            </tr>
            {isLoading ? (
              <tr className="odd:bg-white  even:bg-gray-50  border-b border-gray-200 hidden last:table-row">
                <td colSpan={6} className="px-6 py-4 text-center">
                  Loading ...
                </td>
              </tr>
            ) : (
              data?.data?.map((voucher, index) => (
                <VoucherListRow key={index} voucher={voucher} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && (
        <Pagination
          links={data?.links}
          meta={data?.meta}
          updateFetchUrl={updateFetchUrl}
        />
      )}
    </div>
  );
};

export default VoucherList;
