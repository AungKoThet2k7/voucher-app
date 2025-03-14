import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import ShowDate from "./showDate";
import { lineSpinner } from "ldrs";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
lineSpinner.register();

const VoucherListRow = ({
  voucher: { id, voucher_id, customer_name, customer_email, sale_date },
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    setIsDeleting(true);

    await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
      method: "DELETE",
    });

    toast.success("Product deleted successfully");

    mutate(import.meta.env.VITE_API_URL + "/vouchers");

    setIsDeleting(false);
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
        <ShowDate timestamp={sale_date} />
      </td>
      <td className="px-6 py-4 text-end">
        <button
          onClick={handleDelete}
          type="button"
          className="size-8 flex justify-end items-center text-sm font-medium text-red-500 hover:text-red-700"
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
      </td>
    </tr>
  );
};

export default VoucherListRow;
