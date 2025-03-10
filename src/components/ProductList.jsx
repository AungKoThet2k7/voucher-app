import React from "react";
import { HiOutlineTrash, HiSearch } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import useSWR from "swr";
import ProductListSkeletonLoader from "./ProductListSkeletonLoader";
import ProductRow from "./ProductRow";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductList = () => {
  const { data, error, isLoading } = useSWR(
    import.meta.env.VITE_API_URL + "/products",
    fetcher
  );

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <form className="flex items-center justify-between mb-3">
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <HiSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 focus-visible:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full ps-10 p-2.5  "
            placeholder="Search Product"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-500 hover:bg-sky-700"
        >
          Add new Product
        </button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              <th scope="col" className="px-6 py-3">
                Create at
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ProductListSkeletonLoader />
            ) : (
              data.map((product) => <ProductRow key={product.id} product={product} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
