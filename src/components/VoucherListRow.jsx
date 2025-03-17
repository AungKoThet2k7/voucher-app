import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import ShowDate from "./showDate";
import { lineSpinner } from "ldrs";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
lineSpinner.register();

const VoucherListRow = ({
  voucher: { id, voucher_id, customer_name, customer_email, sale_date },
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this voucher?")) {
      setIsDeleting(true);

      await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
        method: "DELETE",
      });

      toast.success("Product deleted successfully");

      mutate(import.meta.env.VITE_API_URL + "/vouchers");

      setIsDeleting(false);
    }
  };
  return (
    <tr className="odd:bg-white  even:bg-gray-50  border-b border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {voucher_id}
      </th>
      <td className="px-6 py-4">{customer_name}</td>
      <td className="px-6 py-4">{customer_email}</td>
      <td className="px-6 py-4 text-end">
        <ShowDate timestamp={sale_date} hasTime={false} />
      </td>
      <td className="px-6 py-4 text-end">
        <div
          className="inline-flex shadow-xs border border-gray-500"
          role="group"
        >
          <Link
            to={`/voucher/detail/${id}`}
            type="button"
            className="size-8 flex justify-center items-center text-sm font-medium text-sky-500 bg-white hover:bg-gray-200 hover:text-sky-700"
          >
            <TbListDetails />
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

export default VoucherListRow;
