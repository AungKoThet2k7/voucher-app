import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import { useSWRConfig } from "swr";
import { lineSpinner } from "ldrs";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ShowDate from "./showDate";

lineSpinner.register();

const ProductRow = ({ product: { id, name, price, created_at } }) => {
  const { mutate } = useSWRConfig();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    await fetch(import.meta.env.VITE_API_URL + `/products/${id}`, {
      method: "DELETE",
    });

    toast.success("Product deleted successfully");
    mutate(import.meta.env.VITE_API_URL + "/products");
    setIsDeleting(false);
  };

  return (
    <tr className="odd:bg-white  even:bg-gray-50  border-b border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {id}
      </th>
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{price}</td>
      <td className="px-6 py-4 text-end">
        <ShowDate timestamp={created_at} />
      </td>
      <td className="px-6 py-4 text-end">
        <div
          className="inline-flex shadow-xs border border-gray-500"
          role="group"
        >
          <Link
            to={`/product/edit/${id}`}
            type="button"
            className="size-8 flex justify-center items-center text-sm font-medium text-sky-500 bg-white hover:bg-gray-200 hover:text-sky-700"
          >
            <HiOutlinePencil />
          </Link>
          <button
            onClick={handleDelete}
            type="button"
            className="size-8 flex justify-center items-center text-sm font-medium text-red-500 bg-white hover:bg-gray-200 hover:text-red-700"
          >
            {isDeleting ? (
              <l-line-spinner
                size="18"
                stroke="1"
                speed="1"
                color="red"
              ></l-line-spinner>
            ) : (
              <HiOutlineTrash />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
