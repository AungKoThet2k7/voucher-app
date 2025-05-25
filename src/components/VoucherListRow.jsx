import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import ShowDate from "./showDate";
import { lineSpinner } from "ldrs";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import useCookie from "react-use-cookie";
lineSpinner.register();

const VoucherListRow = ({
  voucher: { id, voucher_id, customer_name, customer_email, total, created_at, sale_date },
}) => {
  const [token] = useCookie("token");

  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this voucher?")) {
      setIsDeleting(true);

      const res = await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if(res.status === 200) {
        toast.success(json.message);
        mutate(import.meta.env.VITE_API_URL + "/vouchers");
      } else {
        toast.error(json.message);
      }

      setIsDeleting(false);
    }
  };
  return (
    <tr className="odd:bg-white  even:bg-gray-50  border-b border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {id}
      </th>
      <td className="px-6 py-4 text-nowrap">{voucher_id}</td>
      <td className="px-6 py-4 text-nowrap">{customer_name}</td>
      <td className="px-6 py-4 text-nowrap">{customer_email}</td>
      <td className="px-6 py-4 text-nowrap text-end">{total}</td>
      <td className="px-6 py-4 text-nowrap text-end">
        <ShowDate timestamp={created_at} hasTime={true} />
      </td>
      <td className="px-6 py-4 text-end">
        <div
          className="inline-flex shadow-xs border border-gray-500"
          role="group"
        >
          <Link
            to={`/dashboard/vouchers/details/${id}`}
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
