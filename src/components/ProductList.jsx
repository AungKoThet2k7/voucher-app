import React, { useState } from "react";
import { HiOutlineTrash, HiSearch } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import useSWR from "swr";
import ProductListSkeletonLoader from "./ProductListSkeletonLoader";
import ProductRow from "./ProductRow";
import { Link, useSearchParams } from "react-router-dom";
import ProductEmptyStage from "./ProductEmptyStage";
import useCookie from "react-use-cookie";
import { debounce } from "lodash";
import Pagination from "./Pagination";

const ProductList = () => {
  const [token] = useCookie("token");

  const [params, setParams] = useSearchParams();

  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + "/products"
  );

  const fetcher = (url) =>
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  const handleSearch = debounce((e) => {
    if(e.target.value){
      setParams({ q: e.target.value });
    setFetchUrl(import.meta.env.VITE_API_URL + `/products?q=${e.target.value}`);
    }else{
      setParams({});
      setFetchUrl(import.meta.env.VITE_API_URL + "/products");
    }
  }, 500);

  const updateFetchUrl = (url) => {
    const currentUrl = new URL(url);
    const newSearchParams = new URLSearchParams(currentUrl.search);

    const paramsObj = Object.fromEntries(newSearchParams);

    setParams(paramsObj);
    setFetchUrl(url);
  };

  // if (isLoading) return <div>Loading...</div>;

  // console.log(data);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <HiSearch className="text-gray-500" />
          </div>
          <input
            onChange={handleSearch}
            type="text"
            id="simple-search"
            className="bg-gray-50 focus-visible:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full ps-10 p-2.5  "
            placeholder="Search Product"
          />
        </div>
        <Link
          to="/dashboard/product/create"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-500 hover:bg-sky-700"
        >
          Add new Product
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
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Created at
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Updated at
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ProductListSkeletonLoader />
            ) : data?.data?.length === 0 ? (
              <ProductEmptyStage />
            ) : (
              data?.data?.map((product) => (
                <ProductRow key={product.id} product={product} />
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

export default ProductList;
